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

        $scope.check = function(customers,serverName,flightId){
            $scope.check = [];
            for(var x = 0; x<$scope.array.length;x++){

                if(customers[x].firstName){
                    $scope.check[x].firstName = (false);
                }else{
                    $scope.check[x].firstName = (true);
                }
                if(customers[x].lastName){
                    $scope.check[x].lastName = (false);
                }else{
                    $scope.check[x].lastName = (true);
                }
                if(customers[x].street){
                    $scope.check[x].street = (false);
                }else{
                    $scope.check[x].street = (true);
                }
                if(customers[x].city){
                    $scope.check[x].city = (false);
                }else{
                    $scope.check[x].city = (true);
                }
                if(customers[x].country){
                    $scope.check[x].country = (false);
                }else{
                    $scope.check[x].country = (true);
                }
            }
            for(var i = 0; i<$scope.check.length;i++){
                var count = 0;
               if(!$scope.check[i].firstName && !$scope.check[i].lastName && !$scope.check[i].street && !$scope.check[i].city && !$scope.check[i].country){
                   count++;
               }
                if(count == $scope.check.length){
                    $scope.reserve(customers,serverName,flightId)
                }
            }
        };

        $scope.reserve = function(customers,serverName,flightId){
            var payload = {
                Passengers : customers
            };
            //for(var x = 0; x < payload.passengers.length;x++){
            //    console.log(payload.passengers[x].firstName);
            //}
            //console.log("SERVERNAME: " + serverName + " - FLIGHTID: " + flightId);
            userFactory.postReservation(serverName,flightId,payload)
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
