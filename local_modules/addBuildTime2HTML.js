const through = require('through2')

module.exports = through.obj(function (file, encoding, callback) {
    file.contents = new Buffer(
        file.contents.toString(encoding).replace(/<head>/,`<head><script>window.HKH5_BUILD_TIME="${new Date()}"</script>`)
    );
    callback(null, file)
});