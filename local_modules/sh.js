/*
    Interesting things:
    the child_process's env is the same as the parent_process
    so, the current working directory in the script depends on the parent_process
*/

const CLI_COLORS = require('./cli_colors.js')

module.exports = sh;

function sh(script) {
    let result;
    process.stdout.write(CLI_COLORS.fg.Red)
    try {
        result = require('child_process').execSync(script).toString('utf8').trim()
    } catch(e) {
    }
    process.stdout.write(CLI_COLORS.Reset)

    return result;
}