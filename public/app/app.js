'use strict';

// Declare app level module which depends on views, and components
angular.module('airportApp', [
    'ngRoute',
    'airportApp.controllers',
    'airportApp.directives',
    'airportApp.services',
    'airportApp.factories',
    'airportApp.filters',
    'airportApp.home',
    'airportApp.createUser',
    'airportApp.booking',
    'airportApp.departureDate',
    'airportApp.view2',
    'airportApp.view3'

]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });



