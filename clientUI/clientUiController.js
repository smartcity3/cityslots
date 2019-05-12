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

app.directive('slotselectormodal', function() {
    return {
      templateUrl: './modal/slotconfirmationmodal.html'
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
    let conf = {
        //url:"http://172.16.220.205:3200"
        url:"http://172.16.220.205:3200"
    }
    $scope.star = 50;
    $scope.heart = 35;
    $scope.diamonds = 65;
    $scope.userToken = "";
    $scope.mainClientUIVisible = false;
    $scope.loginPageVisible = true;
    $scope.slotSelectorVisible = false;
    $scope.cancelTimer = false;
    $scope.modalSlotSelectorVisible = false;
    $scope.searchDate = new Date();
    $scope.searchTime = new Date(0, 0, 0, 0,0,0);
    $scope.favoritePlaces = [

    ]
    $scope.openedSlots = [
        {ID:1,name:'3ο Δημοτικό',initial:'8:00',time:'5 λεπτά'},
        {ID:2,name:'Πλατεία',initial:'10:15',time:'15 λεπτά'},
        {ID:3,name:'Ιατρικό',initial:'12:20',time:'20 λεπτά'}

    ]
    var connectSocket = io.connect(conf.url);

    connectSocket.on('connect', function () {
        connectSocket.emit('hi!');
        connectSocket.on('broadcast', function (data) {
            console.log("here");
        });
    });

    $scope.login = function() {
        var userObject = {
            username:"test",
            password:"test"
        }
        $http.post(conf.url+"/users/login/",userObject).then(function(response) {
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
    $scope.counter = 30;
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

    $scope.openSlotSelectorModal = function() {
        $scope.modalSlotSelectorVisible = true;
        $scope.slotSelectorVisible = false;
    }

    $scope.extraTime = function() {
        $scope.counter = $scope.counter + 300;
    }

    $scope.bookSlot = function() {
        $http.get(conf.url+"slots/bookSlot/1").then(function(response) {
            if(response.data.success){
                $scope.modalSlotSelectorVisible = false;
                $scope.mainClientUIVisible = true;
            }
        });
    }

}]);