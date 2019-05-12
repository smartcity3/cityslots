angular.module('myApp.services.parking',[])

.factory('ParkingService',['$http','GlobalConfigService',function($http,config){
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
                    if(!slt.available){
                        slt.username='Test User';
                    }
                    slt.label = {
                        show: true
                    };
                })
            });
    }

    service.reserveSlotById = function(id){
        console.log("msg",id);
        service.slots.forEach(function(slt){
            if(slt.ID===id){
                slt.available = false;
                slt.username = 'Test User';
            }
        })
    }

    service.changeSlotById = function(oldId,newId){
        service.slots.forEach(function(slt){
            if(slt.ID===oldId){
                slt.available = true;
                slt.username = null;
            }
            if(slt.ID===newId){
                slt.available = false;
                slt.username = 'Test User';
            }
        })
    }

    return service;
}]);