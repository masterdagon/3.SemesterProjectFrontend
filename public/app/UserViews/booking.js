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
        $scope.customers=[];

        $scope.getNumberOfTravellers = function(num){
            $scope.array = [];
            for(var i = 0; i<num;i++){
                $scope.array.push(i);
            }
            console.log($scope.array);
        };

        $scope.reserve = function(customers,serverName,flightId){
            var payload = {
                passengers : customers
            };
            console.log(payload);
            console.log("SERVERNAME: " + serverName + " - FLIGHTID: " + flightId);
        }

    }]);
