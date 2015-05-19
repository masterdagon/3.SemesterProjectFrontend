'use strict';

angular.module('airportApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'app/AllViews/home.html'
  });
}])

.controller('homeCtrl', function($scope) {

});