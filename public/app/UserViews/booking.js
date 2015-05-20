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
                Passengers : customers
            };
            for(var x = 0; x < payload.passengers.length;x++){
                console.log(payload.passengers[x].firstName);
            }
            console.log("SERVERNAME: " + serverName + " - FLIGHTID: " + flightId);
            userFactory.postReservation(serverName,flightId,customers)
                .success(function (data, status, headers, config) {
                    $scope.reservation = data;
                    $scope.error = null;
                }).
                error(function (data, status, headers, config) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                    $scope.info = null;
                });
        }

    }]);
