'use strict';

angular.module('airportApp.createUser', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/createUser', {
            templateUrl: 'app/AllViews/createUser.html',
            controller: 'createUserCtrl'
        });
    }])
    .controller('createUserCtrl',['$scope','indexFactory', function($scope,indexFactory) {
        console.log('test');
        $scope.title='test';

        $scope.saveUser = function(){
            indexFactory.saveUser($scope.newUser)
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