const fs = require('fs')
const path = require('path')

module.exports = (page_name, modifyFunc) => {
    //add content 2 dest/page before </html>
    var filename = path.join(process.env.PWD, `/dest/${ page_name }.html`);
    var fileContent = fs.readFileSync(filename).toString('utf-8');
    var modifyFuncType = Object.prototype.toString.call(modifyFunc);

    if (modifyFuncType == '[object Function]')
        fileContent = modifyFunc(fileContent);

    if (modifyFuncType == '[object Array]')
        modifyFunc.forEach(
            func => fileContent = func(fileContent)
        );

    fs.writeFileSync(filename, fileContent);
}