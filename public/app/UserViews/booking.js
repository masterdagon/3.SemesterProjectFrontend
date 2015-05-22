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
        $scope.array = [];

        $scope.getNumberOfTravellers = function(num){
            $scope.array = [];
            for(var i = 0; i<num;i++){
                $scope.array.push(i);
            }
            console.log($scope.array);
        };

        $scope.checker = function(customers,serverName,flightId){
            if(check){
                check = [];
            }
            var check = [];
            for(var x = 0; x<customers.length;x++){
                var passenger = {
                    firstName : true,
                    lastName : true,
                    street : true,
                    city : true,
                    country : true
                };
                check.push(passenger);
                if(customers[x].firstName){
                    check[x].firstName = false;
                }else{
                    check[x].firstName = true;
                }
                if(customers[x].lastName){
                    check[x].lastName = false;
                }else{
                    check[x].lastName = true;
                }
                if(customers[x].street){
                    check[x].street = false;
                }else{
                    check[x].street = true;
                }
                if(customers[x].city){
                    check[x].city = false;
                }else{
                    check[x].city = true;
                }
                if(customers[x].country){
                    check[x].country = (false);
                }else{
                    check[x].country = (true);
                }
            }
            $scope.check = check;
            var count = 0;
            for(var i = 0; i<customers.length;i++){
               if(!$scope.check[i].firstName && !$scope.check[i].lastName && !$scope.check[i].street && !$scope.check[i].city && !$scope.check[i].country){
                   count++;
               }
                if(count == $scope.check.length){
                    reserve(customers,serverName,flightId)
                }
            }
        };

        function reserve(customers,serverName,flightId){
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
                    $scope.booked = true;
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
