function setUpSocketConection(io) {
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

module.exports = {
    setUpSocketConection: setUpSocketConection
 };