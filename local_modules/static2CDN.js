const fs = require('fs')
const path = require('path')

const open = require("opn")
const vinyl_fs = require('vinyl-fs')
const vinyl_ftp = require('vinyl-ftp')

const CLI_COLORS = require('./cli_colors.js')
const cli_config = require('./cli_config.js')
const cdn_auth = require('../.secret.json').cdn.download

const src_dir = process.env.npm_config_src || cli_config.src || JSON.parse(process.env.npm_config_argv).remain[0];
const last_file_in_src_dir = fs.readdirSync(src_dir).pop();
const local_src = path.join(src_dir, '**');
const now = new Date();
const date_dir = `${ now.getFullYear() }-${ now.getMonth() + 1 }-${ now.getDate() }`;
const remote_dest = path.join(cdn_auth.root_dir, date_dir);
const browser_dest = path.join(cdn_auth.browser_dir, date_dir);

const connect = new vinyl_ftp({
    host: cdn_auth.host,
    user: cdn_auth.username,
    password: cdn_auth.password,
    parallel: 10
});

( vinyl_fs )
    .src(local_src, {buffer: false})
    .pipe(connect.dest(remote_dest));

const last_browser_file = path.join(browser_dest, last_file_in_src_dir);

console.log(`
    ${ CLI_COLORS.fg.Green }
    FTP2CDN
    Local: ${ local_src }
    Remote: ${ remote_dest }
    Dest: ${ last_browser_file }
    ${ CLI_COLORS.fg.White }
    [failed if you see unnormal output above] 😊
    [QUIT: CTRL + C]
    ${ CLI_COLORS.Reset }
`);

open(last_browser_file);