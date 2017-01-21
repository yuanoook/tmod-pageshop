;
(function (win, lib) {
    var public = {
        //获取浏览器url的参数值
        getHrefParam: function (key) {
            var locHref = window.location.href;
            var locArr = locHref.split('?');
            if (locArr.length == 1) {
                return null;
            }
            var params = locArr[1].split('&');
            if (params.length > 0) {
                for (var i = 0; i < params.length; i++) {
                    paramArr = params[i].split('=');
                    if (paramArr[0] == key) {
                        if (paramArr[1] == null || paramArr[1] == '' || paramArr[1] == 'null')
                            return null;
                        return paramArr[1];
                    }
                }
            }
            return null;
        },

        getCookieParam: function (key) {
            var params = {};
            (document.cookie||'').split(';').forEach(function(key_value) {
                params[
                    unescape(key_value.split('=')[0]).trim()
                ] = unescape(
                    (key_value.split('=')[1]||'').trim()
                );
            });
            return params[key];
        }
    };
    
    lib.public = public;

})(window, window['lib'] || (window['lib'] = {}));
