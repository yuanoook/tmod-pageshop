const fs = require('fs')
const buildPage = require('./buildPage.js')
const cli_config = require('./cli_config.js')
const page_name = process.env.npm_config_page || cli_config.page || JSON.parse(process.env.npm_config_argv).remain[0];
const entry_dir = './src/pages';

if (!page_name) return reportError('No page_name to build!');

if (page_name == '.all') {
    let pages = fs.readdirSync(entry_dir).filter(page_name => !/\./.test(page_name));
    return pages.forEach(page_name => buildPage(page_name));
}

buildPage(page_name);