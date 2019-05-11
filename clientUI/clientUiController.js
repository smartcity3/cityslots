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

/*app.directive('openlayer', function() {
    return {
      templateUrl: '../openLayers/index.html'
    };
});*/

app.controller('clientUiController', ['$scope','$http', function($scope,$http) {
    $scope.userToken = "";
    $scope.mainClientUIVisible = true;
    $scope.loginPageVisible = false;
    $scope.openlayerVisible = false;
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
}]);