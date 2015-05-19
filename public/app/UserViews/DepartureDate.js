
'use strict';

angular.module('airportApp.departureDate', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/DepartureDate', {
        templateUrl: 'app/UserViews/DepartureDate.html',
        controller: 'DepartureDateCtrl'
    });
}])
    .controller('DepartureDateCtrl', ['$scope', 'userFactory', function ($scope, userFactory) {
    $scope.departureDate = function(departure,departureDate){
        var date = new Date(dDate);
        var ms = date.getTime();
        userFactory.getDepartureDate(departure,ms)
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