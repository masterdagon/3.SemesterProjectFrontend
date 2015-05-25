'use strict';

angular.module('airportApp.departureDate', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/DepartureDate/:userName', {
            templateUrl: 'app/UserViews/DepartureDate.html',
            controller: 'DepartureDateCtrl'
        });
        //$routeProvider.when('/booking/:name/:flightid',{
        //    templateUrl: 'app/UserViews/booking.html',
        //    controller: 'DepartureDateCtrl'
        //})
    }])
    .controller('DepartureDateCtrl', ['$scope','$routeParams', 'userFactory', function ($scope,$routeParams,userFactory) {
        $scope.booking = function(name,flightId){
            window.location = '#/booking/'+name+'/'+flightId+'/'+$routeParams.userName;
        };

        $scope.search = function () {
            if(!$scope.dDate){
                $scope.checkDate = true;
            }else{
                $scope.checkDate = false;
            }
            if(!$scope.departure){
                $scope.checkDeparture = true;
            }else{
                $scope.checkDeparture = false;
            }
            if(!$scope.arrival && $scope.more){
                $scope.checkArrival = true;
            }else{
                $scope.checkArrival = false;
            }
            if (!$scope.more && !$scope.checkDate && !$scope.checkDeparture) {
                departureDate($scope.departure,$scope.dDate);
            }
            if($scope.more && !$scope.checkDate && !$scope.checkDeparture && !$scope.checkArrival){
                departureArrivalDate($scope.departure,$scope.arrival,$scope.dDate);
            }
        };

        function departureDate(departure, dDate) {
            var date = new Date(dDate);
            var ms = date.getTime();
            userFactory.getDepartureDate(departure, ms)
                .success(function (data, status, headers, config) {
                    $scope.info = data;
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

        function departureArrivalDate(departure,arrival, dDate) {
            var date = new Date(dDate);
            var ms = date.getTime();
            userFactory.getDepartureDateArrival(departure,arrival,ms)
                .success(function (data, status, headers, config) {
                    $scope.info = data;
                    $scope.error = null;
                }).
                error(function (data, status, headers, config) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        }
    }]);