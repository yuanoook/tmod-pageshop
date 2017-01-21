const fs = require('fs')
const path = require('path')
const Mock = require('mockjs')
const responseFixFilter = require('./dev_server/responseFixFilter')

const force_stringify = require('./force_stringify.js')
const mock_json_dir = `${ process.env.PWD }/src/mock_api`

module.exports = patientApiByPassMockJson;

function patientApiByPassMockJson(req, res) {
    // req.path will be changed by proxy server, store it first
    var req_path = req.originalUrl;
    console.log(req_path);

    var responseControl = {
        statusCode: 200,
        serverError: false, 
        timeout: 0,
        resCode: 0
    };

    req.method=='POST' ? getPostBodyByRequest(req).then(handleRequest, responseError) : handleRequest();

    function handleRequest(body) {
        fs.readFile(`${ mock_json_dir }${ req_path }.json`, 'utf8', (err, content) => {
            if(err) return responseError(err);

            try{
                let mockTemplate = JSON.parse(content);

                //validate request payload
                if(mockTemplate._requestPayload) {
                    let payloadValidateResult = Mock.valid(mockTemplate._requestPayload, body);
                    if(payloadValidateResult.length) return responseError(payloadValidateResult); 
                }

                let mockObj = Mock.mock(mockTemplate);
                responseControl = Object.assign(responseControl, mockTemplate._responseControl);
                responseControl.statusCode = correctStatusCode(responseControl.statusCode);

                mockObj = Object.assign(mockObj, { code: responseControl.resCode });
                mockObj = responseFixFilter(req_path, mockObj);

                content = JSON.stringify(mockObj)
            }catch(e){ return responseError(e); }

            responseControl.timeout ? setTimeout(responseEnd.bind(null, content), responseControl.timeout) : responseEnd(content);
        });
    }

    function responseError(e) {
        console.log(e);
        responseControl.statusCode = 500;
        var content = force_stringify(Object.assign({error: e}, req), true, 2);
        responseEnd(content);
    }

    function responseEnd(content, contentType) {
        res.writeHead(responseControl.statusCode, { 'Content-Type': contentType ? contentType : 'application/json; charset=UTF-8' });
        res.end(
            !responseControl.serverError ? content : '<h1>JAVA.SERVER.ERROR</h1>'
        );
    }
}

function getPostBodyByRequest(request){
    var success_callback, error_callback, result = {
        then (s_callback, f_callback) {
            success_callback = s_callback;
            error_callback = f_callback;
        }
    }

    var body = '';
    request.addListener('data', function(chunk){
        body += chunk;
    });
    request.addListener('end', function(chunk){
        chunk && (body+=chunk);
        try{
            body = JSON.parse(body);
            success_callback && success_callback(body);
        }catch(e){
            error_callback && error_callback(e);
        }
    });

    return result;
}

function correctStatusCode(statusCode) {
    return [100,101,102,200,201,202,203,204,205,206,207,208,226,300,301,302,303,304,305,
    307,308,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,
    421,422,423,424,426,428,429,431,444,451,499,500,501,502,503,504,505,506,507,508,510,
    511,599].indexOf(parseInt(statusCode)) > -1 ? statusCode : 200;
}