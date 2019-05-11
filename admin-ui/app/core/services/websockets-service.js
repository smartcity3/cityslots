angular.module('myApp.services.websocket',[])

.factory("WebsocketService",[function(){
    var service = {};
    const socket = io('http://172.16.220.205:3200');
    //const socket = io('http://localhost:4000');

    socket.on('connect', function(msg){
        console.log('message: ' + msg);
        setInterval(function(){
            console.log("emiting ping");
            socket.emit('message',{msg:'Hello from Stef',type:"PING"});
            socket.emit('broadcast',{msg:'Hello from Stef',type:"PING"});
        },1500);
    });

    socket.on('broadcast',function(msg){
        console.log("BR",msg);
    })

    service.socket = socket;

    return service;
}]);