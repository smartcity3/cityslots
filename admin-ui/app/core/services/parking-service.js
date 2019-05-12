angular.module('myApp.services.parking',[])

.factory('ParkingService',['$http','GlobalConfigService','WebsocketService',function($http,config,socket){
    let service = {};

    service.notifications = [{
        msg:'You have arrived to your parking slot'
    },
    {
        msg:'Reminder for your parking reservation'
    }];

    service.slots = [];

    service.getAvailableSlots = function(){
        return $http.get(config.url+'/slots/available')
            .then(function(res){
               service.slots = res.data;
               return res.data;
            })
            .then(function(slots){
                slots.forEach(function(slt){
                    slt.occupied = slots.indexOf(slt)%2==0;
                    if(slt.occupied){
                        slt.username='Test User';
                    }
                    slt.label = {
                        show: true
                    };
                })
            });
    }

    return service;
}]);