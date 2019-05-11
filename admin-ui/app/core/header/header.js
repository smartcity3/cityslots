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
.controller('HeaderCtrl', [function($scope) {
    $scope.dynamicPopover = {
        content:'cont',
        title:'title'
    }
}]);