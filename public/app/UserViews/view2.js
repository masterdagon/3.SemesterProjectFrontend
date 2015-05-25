'use strict';

angular.module('airportApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2/:username', {
            templateUrl: 'app/UserViews/view2.html',
            controller: 'View2Ctrl'
        });
    }])
    .controller('View2Ctrl', ['$scope', '$http', 'userFactory','$routeParams', function ($scope, $http, userFactory,$routeParams) {
        var username = $routeParams.username;
        $scope.username = username
        userFactory.getUser(username)
            .success(function (data, status, headers, config) {
                $scope.user = data;
                $scope.error = null;
                if($scope.user.tickets.length ==0){
                    $scope.notickets = false;
                }else{
                    $scope.notickets = true;

                }
            }).
            error(function (data, status, headers, config) {
                if (status == 401) {
                    $scope.error = "You are not authenticated to request these data";
                    return;
                }
            });

        $scope.back = function(){
            $scope.showReservation = false;
        };

        $scope.getReservation = function(servername, rID){
            $scope.showReservation = true;
            userFactory.getReservation(servername,rID)
                .success(function (data, status, headers, config) {
                    $scope.reservation=data;
                    $scope.price = $scope.reservation.totalPrice / $scope.reservation.Passengers.length;
                }).
                error(function (data, status, headers, config) {
                });
        };

        $scope.deleteReservation = function(name,rId,userName,tId){
            userFactory.deleteReservation(name,rId,userName,tId)
                .success(function (data, status, headers, config) {
                    $scope.error = null;
                    $scope.user = null;
                    userFactory.getUser(username)
                        .success(function (data, status, headers, config) {
                            $scope.user = data;
                            $scope.error = null;
                            if($scope.user.tickets.length ==0){
                                $scope.notickets = false;
                            }else{
                                $scope.notickets = true;
                            }
                        }).
                        error(function (data, status, headers, config) {
                            if (status == 401) {
                                $scope.error = "You are not authenticated to request these data";
                                return;
                            }
                        });
                }).
                error(function (data, status, headers, config) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                });
        }
    }]);