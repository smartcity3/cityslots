angular.module('myApp.services.websocket',[])

.factory("WebsocketService",['GlobalConfigService','ParkingService','$rootScope',function(config,parkingService,$rootScope){
    var service = {};
    const socket = io(config.url);
    //const socket = io('http://localhost:4000');

    socket.on('connect', function(msg){
        console.log('message: ' + msg);
        // setInterval(function(){
        //     console.log("emiting ping");
        //     socket.emit('message',{msg:'Hello from Stef',type:"PING"});
        //     socket.emit('broadcast',{msg:'Hello from Stef',type:"PING"});
        // },1500);
    });

    socket.on('broadcast',function(msg){
        console.log("broadcast",msg);
        let tp = msg.event;
        if(tp=='hideSlot'){
            handleHideSlotMessage(msg);
        }
        else if(tp=='giveAway'){
            handleGiveAwayMessage(msg)
        }
    })

    handleGiveAwayMessage = function(msg){
        parkingService.changeSlotById(msg.oldID,msg.newID);
        $rootScope.$apply();
    }

    handleHideSlotMessage = function(msg){
        parkingService.reserveSlotById(msg.ID);
        $rootScope.$apply();
    }

    service.socket = socket;

    return service;
}]);