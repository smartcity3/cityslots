var io; 

function setUpSocketConection(server) {
    io = require('socket.io').listen(server);
    io.on('connection', function(client) {
        console.log('Client connected...');
    
        client.on('join', function(data) {
            console.log("join");
        });

        client.on('event', function(data) {
            console.log("event");
        });

        client.on('broadcast', function(data) {
            console.log("message");
            client.emit("broadcast", data);
        });
    
        client.on('messages', function(data) {
              // client.emit('broad', data);
              // client.broadcast.emit('broad',data);
              console.log("messages");
        });
    });
}

function broadcastMessage(message) {
    io.soccket.emit("broadcast", message);
}

module.exports = {
    setUpSocketConection: setUpSocketConection,
    broadcastMessage: broadcastMessage
 };