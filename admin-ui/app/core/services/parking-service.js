angular.module('myApp.services.parking',[])

.factory('ParkingService',['$http','GlobalConfigService','WebsocketService',function($http,config,socket){
    let service = {};

    service.notifications = [{
        msg:'Message One'
    },
    {
        msg:'Message Two'
    }];

    service.slots = [{
        name:'one'
    },
    {
        name:'two'
    }];

    service.fetchSlots = function(){
        $http.get(config.url+'');
    }

    return service;
}]);