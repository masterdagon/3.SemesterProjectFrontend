'use strict';

angular.module('airportApp.booking', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/booking/:name/:flightId',{
            templateUrl: 'app/UserViews/booking.html',
            controller: 'bookingCTRL'
        })
    }])
    .controller('bookingCTRL', ['$scope','$routeParams','userFactory', function ($scope, $routeParams ,userFactory) {
        $scope.chosenServerName = $routeParams.name;
        $scope.chosenFlightId = $routeParams.flightId;

        $scope.getNumberOfTravellers = function(num){
            $scope.array = new Array(num);
            for(var i = 0; i<$scope.array.length;i++){
                $scope.array[i]=i;
            }
        };

    }]);
