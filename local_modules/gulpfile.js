/**
 * Created with VSCode.
 * User: yuanhuiming
 * Date: 2017-1-17
 */

const gulp = require('gulp');
const concat = require('gulp-concat');

const tmod = require('gulp-tmod');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const px2rem = require('gulp-px3rem');
const cssmin = require('gulp-minify-css');
const htmlone = require('gulp-htmlone');
const cli_config = require('./cli_config.js');
const addBuildTime2HTML = require('./addBuildTime2HTML.js');

gulp.task('tmod-common',function () {
    gulp.src(`../src/common/tmod/*.html`)
        .pipe(tmod({
            minify: false,
            helpers: '../src/common/tmod/$helper.js',
            base: '../src/common/tmod',
            output: '../src/common/tmod/build'
        }))
});

gulp.task('tmod',function () {  
    gulp.src([`../src/pages/${ cli_config.page }/tmod/*.html`])
        .pipe(tmod({
            minify: false,
            base: `../src/pages/${ cli_config.page }/tmod`,
            runtime: '/dev/null', // no template.js outputted
            combo: false,
            output: `../src/pages/${ cli_config.page }/build/tmod`
        }));
});

gulp.task('combo-template',function () {
    gulp.src([
            `../src/common/tmod/build/template.js`,
            `../src/pages/${ cli_config.page }/build/tmod/*.js`
        ])
        .pipe(concat('template.js', {newLine: ';'}))
        .pipe(gulp.dest(`../src/pages/${ cli_config.page }/build`));
});

gulp.task('sass', function () {
    return gulp.src(`../src/pages/${ cli_config.page }/*.scss`)
        .pipe(sass())
        .pipe(px2rem({
            baseDpr: 2,                 // base device pixel ratio (default: 2)
            threeVersion: false,        // whether to generate 3x version (default: true)
            remVersion: true,           // whether to generate rem version (default: true)
            remUnit: 75                 // rem unit value (default: 64)
        }))
        .pipe(rename(function (path) {
            path.basename = path.basename.replace('.debug', '');
        }))
        .pipe(gulp.dest(`../src/pages/${ cli_config.page }/build`));
});

gulp.task('htmlone', function () {
    return gulp.src(`../src/pages/${ cli_config.page }/index.html`)
        .pipe(htmlone())
        .pipe(rename(`${ cli_config.page }.html`))
        .pipe(addBuildTime2HTML)
        .pipe(gulp.dest(`../dest/`));
});