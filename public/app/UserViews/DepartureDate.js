/**
 * Created by Muggi on 19-05-2015.
 */
'use strict';

app = angular.module('airportApp.departureDate', ['ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/departuredate', {
        templateUrl: 'app/UserViews/DepartureDate.html',
        controller: 'DepartureDateCtrl'
    });
}])
app.controller('DepartureDateCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.departureDate = function(departure,departureDate){
        $http({
            method: 'GET',
            url: 'userApi/f/' + departure + "/" + departureDate
        })
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