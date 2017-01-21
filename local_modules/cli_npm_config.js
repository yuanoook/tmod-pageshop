/*
    #npm run script[script.js] --page=b-rule --a=1 b=2

    >   
    >   {
            a: '1',
            b: '2',
            page: 'b-rule'
        }
*/

const cli_npm_config = {}

for (let key in process.env) /^npm_config_/.test(key) && (cli_npm_config[key.replace(/^npm_config_/,'')] = process.env[key]);

module.exports = cli_npm_config