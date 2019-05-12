function createSocketConnection() {
    io.on('connection', function(client) {
        console.log('Client connected...', client);
    });
}

function broadcastMessage(event, message) {
    console.log("BROADCAST",event,message);
    io.emit(event, message);
}

module.exports = {
    createSocketConnection: createSocketConnection,
    broadcastMessage: broadcastMessage
 }