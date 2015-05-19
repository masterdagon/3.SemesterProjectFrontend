'use strict';

angular.module('airportApp.departureDate', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/DepartureDate', {
            templateUrl: 'app/UserViews/DepartureDate.html',
            controller: 'DepartureDateCtrl'
        });
    }])
    .controller('DepartureDateCtrl', ['$scope', 'userFactory', function ($scope, userFactory) {
        $scope.search = function () {
            if (!$scope.more) {
                departureDate($scope.departure,$scope.dDate);
            }
            if($scope.more){
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