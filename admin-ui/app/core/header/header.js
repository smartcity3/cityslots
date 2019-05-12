'use strict';

angular.module('myApp.header', ['ngRoute'])

.directive('header', [function(version) {
    return {
        templateUrl:'/core/header/header.html',
        link: function (scope, elm, attrs) {
            elm.text(version);
        }
    }
}])
.controller('HeaderCtrl', ['$scope','$location','AuthService','ParkingService',function($scope,$location,auth,parkingService) {
    $scope.auth = auth;
    $scope.parkingService = parkingService;

    if(!$scope.auth.loggedUser){
        $location.path("/login");
    }

    $scope.dynamicPopover = {
        notificationsTemplateUrl:'core/templates/notifications-template.html',
        userTemplateUrl:'core/templates/user-template.html'
    }
}]);