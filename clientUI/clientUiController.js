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

app.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }])

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
    $scope.selectedSlot = {};
    $scope.mainClientUIVisible = false;
    $scope.loginPageVisible = true;
    $scope.slotSelectorVisible = false;
    $scope.cancelTimer = false;
    $scope.modalSlotSelectorVisible = false;
    $scope.searchDate = new Date();
    $scope.searchTime = new Date(0, 0, 0, 13,0,0);
    function removeSlot(id) {
        for(let i in $scope.openedSlots) {
            if($scope.openedSlots[i].ID == id) {
                $scope.openedSlots.splice(i, 1);
                break;
             }
        }
    }
    $scope.changeSlot = function() {
        console.log(conf.url+"/slots/giveAway/");
        $http.get(conf.url+"/slots/giveAway/",{ headers: {'x-access-token': $scope.userToken} }).then(function(response) {
            removeSlot(response.data.giveAwaySlotID);
            $scope.openedSlots.push(response.data.newSlot);
            $scope.heart += response.data.currency3;
        });
    }
    $scope.openedSlots = [
        {ID:2,name:'3ο Δημοτικό',initial:'8:00',time:'5 λεπτά'},
        {ID:4,name:'Πλατεία',initial:'10:15',time:'15 λεπτά'},
        {ID:10,name:'Ιατρικό',initial:'12:20',time:'20 λεπτά'}

    ]
    var connectSocket = io.connect(conf.url);

    connectSocket.on('connect', function () {
        connectSocket.emit('hi!');
        connectSocket.on('broadcast', function (data) {
            console.log("here");
            if(data.event == "giveAwayRequest") {
                var result = confirm("Θα Θέλατε να αντικαταστήσετε το slot Εκκλήσια με το slot Φούρνος?");
                if(result) {
                    $scope.changeSlot();
                }
            }
            
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

    $scope.startTimer = function () {
        $scope.counter = $scope.counter + 900; 
        intervalTime = $interval(function(){
            $scope.counter--;  
            if($scope.counter == 0){
                $interval.cancel(intervalTime);
                intervalTime = null;
                $scope.cancelTimer = true;
            }
        },1000);
    }

    $scope.search = function() {
        $scope.slotSelectorVisible = true;
        $scope.mainClientUIVisible = false;
    }

    $scope.counter = 1;
    var intervalTime=null;   
    intervalTime = $interval(function(){
        $scope.counter--;  
        if($scope.counter == 0){
            $interval.cancel(intervalTime);
            intervalTime = null;
            $scope.cancelTimer = true;
        }
    },1000);
    
    $scope.selectSlot = function(ID) {
        for(var i = 0; i < $scope.openedSlots.length; i++){
			if($scope.openedSlots[i].ID == ID){
                delete $scope.openedSlots[i].available;
                delete $scope.openedSlots[i].lat;
                delete $scope.openedSlots[i].lon;
				$scope.selectedSlotID =  $scope.openedSlots[i].ID;
			}
		}
    }
    
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
        $scope.staticToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJyb2xlSUQiOjEsImlhdCI6MTU1NzU5ODcxNn0.jZ6KPM7x4vBhp3zOo6ep6kkG92UyRjBNgji-kXxcuHY"
        $http.get(conf.url+"/slots/bookSlot/1",{ headers: {'x-access-token': $scope.staticToken} }).then(function(response) {
                $scope.modalSlotSelectorVisible = false;
                $scope.mainClientUIVisible = true;
                $scope.openedSlots.push(response.data.slot);
                $scope.diamonds += response.data.currency1;
                $scope.orizomilon = {};
        });
    }

}]);