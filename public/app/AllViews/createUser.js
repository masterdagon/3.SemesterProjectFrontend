'use strict';

angular.module('airportApp.createUser', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/createUser', {
            templateUrl: 'app/AllViews/createUser.html'
        });
    }])

    .controller('createUserCtrl', function() {
    });