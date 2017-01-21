+function(){
    var startTime = new Date().valueOf();
    var first = true;
    window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
        //防止频度太高的alert报错
        if( new Date().valueOf() - startTime < 5000 && !first ) return;
        startTime = new Date().valueOf();
        frist = false;
        var errmsg = "错误信息：" + errorMessage + "\n";
            errmsg +="出错文件：" + scriptURI + "\n";
            errmsg +="出错行号：" + lineNumber + "\n";
            errmsg +="出错列号：" + columnNumber + "\n";
            errmsg +="错误详情：" + JSON.stringify(errorObj);

        alert( errmsg );
    };

    //TODO: alert handle
}(); 