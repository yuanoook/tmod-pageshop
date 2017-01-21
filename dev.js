/**
 * Author: Rango
 * Date: 16-12-16
    Dev proxy api
        1. use src/mock_api/*.json [default]
        2. use online backend server [optional]
        > node dev --proxy_target=http://192.168.0.61:8080
    Auto reload *.html in browser on dev

    After you first clone the repo, before `node dev` 
    Run:
       npm run build-all
 */
const fs = require('fs')
const path = require('path')
const server = require('http').createServer()

const ip = require('ip')
const open = require("opn")

const express = require("express")
const serveIndex = require('serve-index')
const proxy = require("http-proxy-middleware")
const watch = require('node-watch')

const autoServerRetask = require('./local_modules/autoServerRetask.js')
const autoBrowserMessenger = require('./local_modules/autoBrowserMessenger.js')(server)
const patientApiByPassMockJson = require('./local_modules/patientApiByPassMockJson.js')

const local_ip = ip.address()
const port = 8018

const cli_colors = require('./local_modules/cli_colors.js')
const cli_config = require('./local_modules/cli_config.js')
const local_host = `${ local_ip }:${ port }`
const proxy_target_host = (cli_config.proxy_target || '').replace(/^(http(s?):\/\/)?([^\/]*).*/,'$3')

app = new express()
    .get(/\.html?$/, (req, res) => {
        res.setHeader("Content-Type", "text/html");
        let content = fs.readFileSync(path.join(__dirname, req.path)).toString('utf-8');
        res.end(
            content.replace(/<\/html>\s*$/,`
                <script src="/local_modules/dev_browser/alert-error.js"></script>
                <script src="/local_modules/dev_browser/dev-reload.js?connect=${ local_host }"></script>
            </html>`)
        )
    })
    .use('/patientapi', 
        !cli_config.proxy_target ? patientApiByPassMockJson : proxy({
            target: cli_config.proxy_target.replace(/^(http(s?):\/\/)?/,'http$2://'),
            changeOrigin: true,
            secure: false,
            onProxyReq: (proxyReq, req) => Object.keys(req.headers).forEach(
                key => proxyReq.setHeader(key, req.headers[key].replace(local_host, proxy_target_host)
            )),
            onProxyRes: (proxyRes, req, res) => Object.keys(proxyRes.headers).forEach(
                key => res.append(key, proxyRes.headers[key]
            ))
        })
    )
    .use(serveIndex('./', {'icons': true}), express.static('./'));
    
server.on('request', app)
server.listen(port, () => {
    watch(['./src/common', './src/pages', './dest', './local_modules/dev_browser'], filename => {
        autoServerRetask(filename);
        autoBrowserMessenger({
            type: 'filechanged',
            filename: filename
        });
    });
    open(`http://${ local_ip }:${ port }/src/pages/hello-world/index.html`);
    console.log(`${ cli_colors.fg.Green }    DEV Ready! \n${ local_ip }:${ port } ${ cli_colors.Reset }`);
})