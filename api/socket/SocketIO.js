function broadcastMessage(event, message) {
    io.emit(event, message);
}

module.exports = {
    broadcastMessage: broadcastMessage
 }