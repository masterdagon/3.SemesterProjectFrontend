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
            $scope.CheckUserNameError = false
            $scope.CheckUserNameSucces = false
            $scope.CheckEmailError= false
            $scope.CheckEmailSucces = false
            $scope.CheckPWError= false
            $scope.CheckPWSucces = false

            if($scope.newUser == undefined){
                $scope.CheckUserNameError = "UserName must be filled out"
                $scope.CheckEmailError = "Email is not a valid email"
                $scope.CheckPWError = "password must be at least 8 characters long"
            }else{
                if($scope.newUser.userName == undefined || $scope.newUser.email == undefined || $scope.newUser.pw == undefined){
                    if($scope.newUser.userName == undefined){
                        $scope.CheckUserNameError = "UserName must be filled out"
                    }
                    if($scope.newUser.email == undefined){
                        $scope.CheckEmailError = "Email is not a valid email"
                    }
                    if($scope.newUser.pw == undefined){
                        $scope.CheckPWError = "password must be at least 8 characters long"
                    }
                }else if($scope.newUser.userName == "" || $scope.newUser.email == "" || $scope.newUser.pw.length < 7){
                    if($scope.newUser.userName == ""){
                        $scope.CheckUserNameError = "UserName must be filled out"
                    }
                    if($scope.newUser.email == ""){
                        $scope.CheckEmailError = "Email is not a valid email"
                    }
                    if($scope.newUser.pw.length < 8){
                        $scope.CheckPWError = "password must be at least 8 characters long"
                    }
                }else{
                    if($scope.newUser.pw.length >7){
                        $scope.CheckPWError= false;
                        $scope.CheckPWSucces = true
                    }else{
                        $scope.CheckPWError= true;
                        $scope.CheckPWSucces = false
                    }
                    indexFactory.checkUserEmail($scope.newUser.userName,$scope.newUser.email)
                        .success(function (data, status, headers, config) {
                            console.log('user = '+data.userName)
                            console.log('email = '+data.email)
                            if(data.userName){
                                $scope.CheckUserNameError = "userName already exist try again";
                                $scope.CheckUserNameSucces = false
                            }else{
                                $scope.CheckUserNameError = false;
                                $scope.CheckUserNameSucces = true
                            }
                            if(data.email){
                                $scope.CheckEmailError= "email already exist try again";
                                $scope.CheckEmailSucces = false
                            }else{
                                $scope.CheckEmailError= false;
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
                            console.log('error')
                            if (status == 401) {
                                $scope.error = "You are not authenticated to request these data";
                                return;
                            }
                            $scope.error = data;
                        });
                }
            }

        }
    }]);