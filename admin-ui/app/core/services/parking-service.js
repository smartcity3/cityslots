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
                service.mapSlots = [];
                slots.forEach(function(slt){
                    slt.label = {
                        show: true
                    };
                })
            });
    }

    return service;
}]);