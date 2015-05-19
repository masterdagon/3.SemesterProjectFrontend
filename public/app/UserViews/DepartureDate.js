
'use strict';

angular.module('airportApp.departureDate', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/DepartureDate', {
        templateUrl: 'app/UserViews/DepartureDate.html',
        controller: 'DepartureDateCtrl'
    });
}])
    .controller('DepartureDateCtrl', ['$scope', '$http', function ($scope, $http) {
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