var clientsConnected = {};

function setUpSocketConection(io) {
    io.on('connection', function(client) {
        console.log('Client connected...',client);
    
        client.on('join', function(data) {
            console.log(data);
            clientsConnected[data.id] = client.id;
        });
    
        client.on('messages', function(data) {
              // client.emit('broad', data);
              // client.broadcast.emit('broad',data);
              //console.log(data);
        });
    });
}

module.exports = {
    setUpSocketConection: setUpSocketConection
 };