// for auto reload
const WebSocketServer = require('ws').Server
const ws_pool = []

module.exports = server => { 
    wss = new WebSocketServer({ server: server })
    wss.on('connection', function connection(ws) {
        ws_pool.push(ws);
        ws.on('close', function(message) {
            var i = ws_pool.indexOf(ws);
            i>-1 && ws_pool.splice(i,1);
        });
    });

    return msg => ws_pool.forEach(
        ws => ws.send(
            typeof msg == 'string' ? msg : JSON.stringify(msg)
        )
    )
}
