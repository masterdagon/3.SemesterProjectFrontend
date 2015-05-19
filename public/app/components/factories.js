'use strict';

/* Factories */

angular.module('airportApp.factories', []).
  factory('InfoFactory', function () {
    var info = "Hello World from a Factory";
    var getInfo = function getInfo(){
      return info;
    }
    return {
      getInfo: getInfo
    }
  })
  .factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      },
      responseError: function (rejection) {
        if (rejection.status === 401) {
          // handle the case where the user is not authenticated
        }
        return $q.reject(rejection);
      }
    };
  })
.factory('userFactory', function ($http) {
        var urlBase = '/userApi';
        var userFactory = {};

        userFactory.getDepartureDate = function (departure,date) {
            return $http.get(urlBase+'/f/'+departure+'/'+date);
        };

        userFactory.getDepartureDateArrival = function (title) {
            return $http.get(urlBase +'/f/'+departure+'/'+arrival+'/'+date);
        };

        userFactory.getReservation = function (name,rID) {
            return $http.get(urlBase+'/r/'+name+'/'+rID);
        };

        userFactory.postReservation = function (name,flightID,passengers) {
            return $http.post(urlBase + '/r/'+name+'/'+flightID,passengers);
        };

        userFactory.deleteReservation = function (name,rID) {
            return $http.delete(urlBase + '/r/'+name+'/'+rID);
        };

        return userFactory;
    });

