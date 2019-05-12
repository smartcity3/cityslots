'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])

.controller('DashboardCtrl', ['$scope','ParkingService',function($scope,parkingService) {
  $scope.parkingService = parkingService;

  $scope.center = {
    lat: 37.9838179,
    lon: 23.6684003,
    zoom: 19
  }

  parkingService.getAvailableSlots();

}]);