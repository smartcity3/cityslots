app = angular.module('clientUiModule', ['ui.bootstrap','openlayers-directive']);

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

app.directive('slotselector', function() {
    return {
      templateUrl: './slotsSelector/slotselector.html'
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
    $scope.mainClientUIVisible = false;
    $scope.loginPageVisible = true;
    $scope.slotSelectorVisible = false;
    $scope.cancelTimer = false;
    $scope.searchDate = new Date();
    $scope.searchTime = new Date(0, 0, 0, 0,0,0);

    var connectSocket = io.connect('http://172.16.220.205:3200');

    connectSocket.on('connect', function () {
        connectSocket.emit('hi!');
    });

    $scope.login = function() {
        var userObject = {
            username:"test",
            password:"test"
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
        $scope.slotSelectorVisible = true;
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

    $scope.showDetails = function(id) {
        alert('lat: '+ id.lat+', '+'lon: '+id.lon);
      };
    angular.extend($scope, {
    center: {
        lat: 37.9838179,
        lon: 23.6684003,
        zoom: 19
    },
    finisterre: {
        lat: 37.983684,
        lon: 23.668459,
        label: {
        show: true,
        },
        onClick: function (event, properties) {
        alert('lat: '+ properties.lat+', '+'lon: '+properties.lon);
        }
    },
    orizomilon: {
        lat: 37.983837,
        lon: 23.668459,
        label: {
            show: true
        }
    },
    santacomba: {
        lat: 37.983967,
        lon: 23.668046,
        label: {
        show: true,
        },
        onClick: function (event, properties) {
        alert('lat: '+ properties.lat+', '+'lon: '+properties.lon);
        }
    }
    });
}]);