const sh = require('./sh.js')
const CLI_COLORS = require('./cli_colors.js')
const modifyDestPage = require('./modifyDestPage.js')

module.exports = page_name => {
    console.log(`${ CLI_COLORS.fg.Yellow }... ${ page_name } building ...${ CLI_COLORS.Reset }`);

    sh(`gulp --gulpfile local_modules/gulpfile.js tmod --page=${page_name}`);
    console.log(`${ CLI_COLORS.fg.Green }1/4 tmod end ✅${ CLI_COLORS.Reset }`);

    sh(`gulp --gulpfile local_modules/gulpfile.js sass --page=${page_name}`);
    console.log(`${ CLI_COLORS.fg.Green }2/4 sass end ✅${ CLI_COLORS.Reset }`);

    sh(`gulp --gulpfile local_modules/gulpfile.js combo-template --page=${page_name}`);
    console.log(`${ CLI_COLORS.fg.Green }3/4 combo-template end ✅${ CLI_COLORS.Reset }`);

    sh(`gulp --gulpfile local_modules/gulpfile.js htmlone --page=${page_name}`);
    console.log(`${ CLI_COLORS.fg.Green }4/4 htmlone end ✅${ CLI_COLORS.Reset }`);

    console.log(`${ CLI_COLORS.fg.Green }${ page_name } builded ${ CLI_COLORS.fg.White }[failed if you see unnormal output above] 😊${ CLI_COLORS.Reset }`);
}