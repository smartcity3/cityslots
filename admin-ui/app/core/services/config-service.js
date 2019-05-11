angular.module('myApp.services.config',[])

.factory("GlobalConfigService",[function(){
    let service = {};
    service.url = "127.0.0.1:8080";

    return service;
}])