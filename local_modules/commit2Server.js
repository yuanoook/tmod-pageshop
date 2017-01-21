const sh = require('./sh.js')
const CLI_COLORS = require('./cli_colors.js')
const server_auth = require('../.secret.json').server
const buildPage = require('./buildPage.js')

module.exports = (server_target, page_name, need_rebuilding = true) => {
    //rebuild before commit
    need_rebuilding && buildPage(page_name);

    if (!page_name) return console.log(CLI_COLORS.fg.Red, 'No page_name to commit to Server!', CLI_COLORS.Reset);

    let root_url = server_auth[server_target].root_url || server_auth[server_target];
    let username = server_auth[server_target].username || server_auth['.username'];
    let password = server_auth[server_target].password || server_auth['.password'];

    let src_file_name = `dest/${ page_name }.html`;
    let target_file_name = `${ username }@${ root_url }${ page_name }.html`;

    console.log(`scp -P 22 ${ src_file_name } ${ target_file_name }`)

    console.log(
        sh(
            `sshpass \
                -p "${ password }" \
                scp -P 22 ${ src_file_name } ${ target_file_name }
            `
        )
    )
}