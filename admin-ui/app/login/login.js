'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope','AuthService',function($scope,auth) {
    $scope.loginForm = {
      username:'test',
      password:'test'
    };

    $scope.login = function(){
        auth.login($scope.loginForm)
            .then(function(res){
                //nothing for now
                if(res.statusCode==200){
                  $scope.$apply();
                }
                else{
                  $scope.msg = res.message;
                }
            });
    }
}]);