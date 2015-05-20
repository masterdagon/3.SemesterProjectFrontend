'use strict';

angular.module('airportApp.createUser', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/createUser', {
            templateUrl: 'app/AllViews/createUser.html',
            controller: 'createUserCtrl'
        });
    }])
    .controller('createUserCtrl',['$scope','indexFactory', function($scope,indexFactory) {
        $scope.CheckUserNameError = false
        $scope.CheckUserNameSucces = false
        $scope.CheckEmailError= false
        $scope.CheckEmailSucces = false
        $scope.CheckPWError= false
        $scope.CheckPWSucces = false



        $scope.saveUser = function(){
            if($scope.newUser.pw.length >7){
                $scope.CheckPWError= false
                $scope.CheckPWSucces = true
            }else{
                $scope.CheckPWError= true
                $scope.CheckPWSucces = false
            }
            indexFactory.checkUserEmail($scope.newUser.userName,$scope.newUser.email)
                .success(function (data, status, headers, config) {
                    console.log(data.userName)
                    if(data.userName){
                        $scope.CheckUserNameError = true
                        $scope.CheckUserNameSucces = false
                    }else{
                        $scope.CheckUserNameError = false
                        $scope.CheckUserNameSucces = true
                    }
                    if(data.userName){
                        $scope.CheckEmailError= true
                        $scope.CheckEmailSucces = false
                    }else{
                        $scope.CheckEmailError= false
                        $scope.CheckEmailSucces = true
                    }
                    if($scope.CheckPWSucces && $scope.CheckEmailSucces && $scope.CheckUserNameSucces ){
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

            })
                .error(function (data, status, headers, config) {
                    if (status == 401) {
                        $scope.error = "You are not authenticated to request these data";
                        return;
                    }
                    $scope.error = data;
                });
        }
    }]);