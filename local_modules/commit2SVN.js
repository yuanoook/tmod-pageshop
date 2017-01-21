const sh = require('./sh.js')
const CLI_COLORS = require('./cli_colors.js')
const svn_auth = require('../.secret.json').svn
const buildPage = require('./buildPage.js')

module.exports = (svn_target, page_name, need_rebuilding = true) => {
    //rebuild before commit
    need_rebuilding && buildPage(page_name);

    if (!page_name) return console.log(CLI_COLORS.fg.Red, 'No page_name to commit with svnmucc!', CLI_COLORS.Reset);

    let root_url = svn_auth[svn_target].root_url || svn_auth[svn_target];
    let username = svn_auth[svn_target].username || svn_auth['.username'];
    let password = svn_auth[svn_target].password || svn_auth['.password'];

    let src_file_name = `dest/${ page_name }.html`;
    let target_file_name = `${ page_name }.html`;
    let commit_msg = `update ${ target_file_name } by ${ process.env.USER || process.env.USERNAME || 'FETEAM' } on ${new Date()}`;

    console.log(`${ CLI_COLORS.fg.Yellow }sending file ${page_name}.html to ${root_url}${ CLI_COLORS.Reset }`);

    console.log(
        sh(
            `svnmucc \
                --root-url ${ root_url } \
                put ${ src_file_name } ${ target_file_name } \
                --message "${ commit_msg }" \
                --username ${ username } \
                --password ${ password }
            `
        )
    )
}