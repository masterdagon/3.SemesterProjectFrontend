'use strict';

/* Factories */

angular.module('airportApp.factories', [])
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

        userFactory.getUser = function(username){
            return $http.get(urlBase + "/u/" + username)
        }

        userFactory.getDepartureDate = function (departure,date) {
            return $http.get(urlBase+'/f/'+departure+'/'+date);
        };

        userFactory.getDepartureDateArrival = function (departure,arrival,date) {
            return $http.get(urlBase +'/f/'+departure+'/'+arrival+'/'+date);
        };

        userFactory.getReservation = function (name,rID) {
            return $http.get(urlBase+'/r/'+name+'/'+rID);
        };

        userFactory.postReservation = function (name,flightID,passengers,userName) {
            return $http.post(urlBase + '/r/'+name+'/'+flightID+'/'+userName,passengers);
        };

        userFactory.deleteReservation = function (name,rID,userName,ticketID) {
            return $http.delete(urlBase + '/r/'+name+'/'+rID + "/" + userName + "/" + ticketID);
        };

        return userFactory;
    })
    .factory('indexFactory', function ($http) {
        var urlBase = '/';
        var userFactory = {};

        userFactory.saveUser = function (user) {
            return $http.post(urlBase+'send',user);
        };

        userFactory.checkUserEmail = function (user,email) {
            return $http.post(urlBase+'check',{userName:user , email:email});
        };


        return userFactory;
    });

