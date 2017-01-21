const sh = require('./sh.js')
const CLI_COLORS = require('./cli_colors.js')

module.exports = (filename) => {
    console.log(`${ CLI_COLORS.fg.Yellow }${filename} changed ❤️`);

    if (/^src\/common\/tmod\/([^\/]*\.html|\$helper\.js)/.test(filename)) {
        return gulpTmodCommonTask();
    }

    if (/^src\/pages\/[^\/]+\/[^\.]+/.test(filename)) {
        var page_name = filename.replace(/^src\/pages\/([^\/]+)\/.*/, '$1');
    
        if (/^src\/pages\/[^\/]+\/build\//.test(filename)) {
            if (/\.css$/.test(filename)) 
                return gulpHtmloneTask(page_name);

            if (/^src\/pages\/[^\/]+\/build\/tmod\/[^\/]+\.js$/.test(filename))
                return gulpComboTemplate(page_name);

            if (/^src\/pages\/[^\/]+\/build\/template\.js$/.test(filename))
                return gulpHtmloneTask(page_name);
        }

        if (/tmod\/[^\/]+\.html$/.test(filename)) 
            return gulpTmodTask(page_name);

        if (/\.scss$/.test(filename))
            return gulpSassTask(page_name);

        if (/(\.js|index\.html)$/.test(filename)) 
            return gulpHtmloneTask(page_name);
    }

    function gulpTmodCommonTask() {
        sh(`gulp --gulpfile local_modules/gulpfile.js tmod-common`);
        console.log(`${ CLI_COLORS.fg.Green }tmod-common end ✅${ CLI_COLORS.Reset }`);
    }

    function gulpTmodTask(page_name) {
        sh(`gulp --gulpfile local_modules/gulpfile.js tmod --page=${page_name}`);
        console.log(`${ CLI_COLORS.fg.Green }${page_name} tmod end ✅${ CLI_COLORS.Reset }`);
    }
    function gulpSassTask(page_name) {
        sh(`gulp --gulpfile local_modules/gulpfile.js sass --page=${page_name}`);
        console.log(`${ CLI_COLORS.fg.Green }${page_name} sass end ✅${ CLI_COLORS.Reset }`);
    }
    function gulpComboTemplate(page_name) {
        sh(`gulp --gulpfile local_modules/gulpfile.js combo-template --page=${page_name}`);
        console.log(`${ CLI_COLORS.fg.Green }${page_name} combo-template end ✅${ CLI_COLORS.Reset }`);
    }
    function gulpHtmloneTask(page_name) {
        sh(`gulp --gulpfile local_modules/gulpfile.js htmlone --page=${page_name}`);
        console.log(`${ CLI_COLORS.fg.Green }${page_name} htmlone end ✅${ CLI_COLORS.Reset }`);
    }
}