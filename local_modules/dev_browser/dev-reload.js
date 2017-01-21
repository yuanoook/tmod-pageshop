({
    init: function() {
        var me = this;
        me.initSocket();
        me.setDocumentDependencies();
    },
    initSocket: function() {
        var me = this;
        var connect = document.scripts[document.scripts.length-1].src.split('=')[1];
        var socket = new WebSocket(`ws://${ connect }`);

        socket.onopen = function () {
            console.log('伦家连好了，感觉棒棒哒 😊');
        }

        socket.onmessage = function (msg) {
            me.msgChannelEventListener(JSON.parse(msg.data))
        }

        socket.onclose = function () {
            setTimeout(function() {
                location.reload();
            }, 5000)
        }
    },
    setDocumentDependencies: function() {
        Array.prototype.forEach.call(document.scripts, function(script) {
            script.src && script.setAttribute('dependency', new URL(script.src).pathname)
        });
        Array.prototype.forEach.call(document.styleSheets, function(stylesheet) {
            stylesheet.ownerNode.href && stylesheet.ownerNode.setAttribute('dependency', new URL(stylesheet.ownerNode.href).pathname)
        });
        document.documentElement.setAttribute('dependency', location.pathname);
    },
    msgChannelEventListener: function(event) {
        var me = this;
        if(event.type = 'filechanged') {
            me.fileChangeHandler( event.filename.replace(/^([^\/])/,'/$1') );
        }
    },
    fileChangeHandler: function(filename) {
        var me = this;
        console.log(filename + ' changed ❤️');
        var dependencies = me.getDocumentDependencies();
        if (dependencies.indexOf(filename) > -1) {
            /\.css$/.test(filename)
                ? me.updateCSS(filename)
                : location.reload();
        }
    },
    getDocumentDependencies: function() {
        var me = this;
        return Array.prototype.map.call(
            document.querySelectorAll(`[dependency]`),
            function(dom) {
                return dom.getAttribute('dependency')
            }
        )
    },
    updateCSS: function(filename) {
        var me = this;
        var old_stylesheet_links = document.querySelectorAll(`[dependency="${ filename }"]`);

        var new_stylesheet_link = document.createElement('link');
        new_stylesheet_link.type = 'text/css';
        new_stylesheet_link.rel = 'stylesheet';
        new_stylesheet_link.href = `${ filename }?timestamp=${ new Date().valueOf() }`;
        new_stylesheet_link.setAttribute('dependency', filename);
        new_stylesheet_link.onload = function() {
            console.log(filename + ' updated ✅');
            old_stylesheet_links.forEach(function(link) {
                link && link.remove && link.remove();
            });
        }

        document.head.appendChild(new_stylesheet_link);
    }
}).init();