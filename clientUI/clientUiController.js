app = angular.module('clientUiModule', ['ui.bootstrap']);

app.directive('login', function() {
    return {
      templateUrl: './login/login.html'
    };
});


app.directive('client', function() {
    return {
      templateUrl: './clientUI/client.html'
    };
});

app.filter('counter', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);

/*app.directive('openlayer', function() {
    return {
      templateUrl: '../openLayers/index.html'
    };
});*/


app.controller('clientUiController', ['$scope','$http','$interval' ,function($scope,$http,$interval) {
    $scope.userToken = "";
    $scope.mainClientUIVisible = true;
    $scope.loginPageVisible = false;
    $scope.openlayerVisible = false;
    $scope.cancelTimer = false;
    $scope.searchDate = new Date();
    $scope.searchTime = new Date(0, 0, 0, 0,0,0);
    $scope.login = function() {
        var userObject = {
            username:$scope.username,
            password:$scope.password
        }
        $http.post("http://172.16.220.205:3200/users/login/",userObject).then(function(response) {
            if(response.data.success){
                $scope.userToken = response.data.token;
                $scope.loginPageVisible = false;
                $scope.mainClientUIVisible = true;
            }
		},function(error){
			$scope.loginMsg = "Failed Login!"
		});
    }
    $scope.search = function() {
        $scope.openlayerVisible = true;
        $scope.mainClientUIVisible = false;
    }
    $scope.counter = 10;
    var intervalTime=null;   
    intervalTime = $interval(function(){$scope.counter--; 
        if($scope.counter == 0){
            $interval.cancel(intervalTime);
            intervalTime = null;
            $scope.cancelTimer = true;
        }
    },1000);
}]);