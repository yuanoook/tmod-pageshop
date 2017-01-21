/**
 * Created by yuanoook on 17/1/18.
 */
;
(function (window, lib) {
    (window.Zepto || window.$)(function () {
        ({
            $app: $('#app'),
            init: function() {
                var me = this;
                me.$app.html(
                    template('common_hello', {
                        name: 'World!'
                    })
                )

                me.bindEvent();  
            },
            bindEvent: function() {
                var me = this;
            }
        }).init();
    });
})(window, window['lib'] || (window['lib'] = {}));