angular.module('myApp.services.auth',[])

.factory("AuthService",['$http','$location','GlobalConfigService',function($http,$location,config){
    let service = {};

    service.loggedUser = null;

    service.login = function(user){
        console.log("ddd",user,config.url+"/users/login/");
        return $http.post(config.url+"/users/login/",user,{})
            .then(function(res){
                console.log("login",res);
                if(res.data.success) {
                    console.log("dash");
                    service.loggedUser = res.data;
                    $http.defaults.headers.common['x-access-token'] = res.data.token;
                    $location.path('/dashboard');
                }
                else{
                    service.loggedUser = {};
                }
                return res.data;
            });

    }

    service.logout = function(){
        service.loggedUser = null;
        $http.defaults.headers.common['x-access-token'] = null;
        $location.path('/login');
    }

    return service;
}])