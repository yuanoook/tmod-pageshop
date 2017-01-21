/*
    #node tmp.js --page=b-rule --a=1 b=2

    >   echo 'console.log(require("./dev-lab/local_modules/cli_config.js"))' > tmp.js && node tmp.js --page=b-rule --a=1 b=2 && rm tmp.js;
    >   {
            a: '1',
            b: '2',
            page: 'b-rule'
        }
*/
const cli_npm_config = require('./cli_npm_config.js')
const cli_config = {}

process.argv.slice(2).forEach((arg) => {
    let key_value = arg.split('=')
    cli_config[key_value[0].replace(/^-*/,'')] = key_value[1]
})

module.exports = Object.assign({}, cli_config, cli_npm_config)