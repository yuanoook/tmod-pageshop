const sh = require('./sh.js')
const CLI_COLORS = require('./cli_colors.js')
const cli_config = require('./cli_config.js')
const commit2SVN = require('./commit2SVN.js')
const commit2Server = require('./commit2Server.js')
const buildPage = require('./buildPage.js')

const page_name = process.env.npm_config_page || JSON.parse(process.env.npm_config_argv).remain[0];
const channels = (process.env.npm_config_channel || cli_config.channel || '').split(',');
const svn_target = process.env.npm_config_svn_target || cli_config.svn_target;
const server_target = process.env.npm_config_server_target || cli_config.server_target;

if (!channels.length) return reportError('No channel to commit!');
if (!page_name) return reportError('No page_name to commit!');

//rebuild before commit
buildPage(page_name);
let need_rebuilding = false;

if (channels.indexOf('svn') > -1) {
    if (!svn_target) return reportError('No svn_target to commit!');
    commit2SVN(svn_target, page_name, need_rebuilding);
}

if (channels.indexOf('server') > -1) {
    if (!server_target) return reportError('No server_target to commit!');
    commit2Server(server_target, page_name, need_rebuilding);
}

function reportError(msg) {
    return console.log(CLI_COLORS.fg.Red, msg, CLI_COLORS.Reset);
}