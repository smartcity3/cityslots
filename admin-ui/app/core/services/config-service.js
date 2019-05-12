angular.module('myApp.services.config',[])

.factory("GlobalConfigService",[function(){
    let service = {};
    //service.url = "http://127.0.0.1:3200";
    service.url = "http://172.16.220.205:3200";

    return service;
}])