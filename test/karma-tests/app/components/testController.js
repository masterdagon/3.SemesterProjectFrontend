/**
* Created by Dennnis on 25-05-2015.
*/
describe("AppCtrl", function () {

    var scope, httpBackend, location, route;

    beforeEach(module('airportApp.controllers'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, $location) {
        location = $location;
        httpBackend = $httpBackend;
        scope = $rootScope.$new();
        $controller("AppCtrl", {$scope: scope});
    }));

    it("title and username", function () {
        expect(scope.title).toBe("Semester Project");
        expect(scope.username).toBe("");
    });

    it("should work1", function () {

        httpBackend.expectPOST('/authenticate').respond(200, {token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NTUzYWUyY2Q5N2NhYjk0MjA2YjgyODgiLCJ1c2VyTmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5kayIsInB3IjoiJDJhJDEwJDc2dXJwSjNYMFZYNUlsTXgxTnMuYS5waU1vZndqbjdIM2ZBR3pEMWhuWmNaNWZtUlcyRWZtIiwiYWN0aXZhdGVkIjp0cnVlLCJyb2xlIjoidXNlciIsIl9fdiI6MCwiY3JlYXRlZCI6IjIwMTUtMDUtMTNUMjA6MDA6NDUuMTAzWiJ9.V8qQ3p5-pCMnXQ7KL10xwiWgJT49S3Nt4t-e18yS5II"});

                expect(scope.isAuthenticated).toBeFalsy();
        expect(scope.isUser).toBeFalsy();
        expect(scope.isAdmin).toBeFalsy();

        scope.submit();
        httpBackend.flush();

        expect(scope.isAuthenticated).toBeTruthy();
        expect(scope.isUser).toBeTruthy();
        expect(scope.isAdmin).toBeFalsy();

        scope.logout();

        expect(scope.isAuthenticated).toBeFalsy();
        expect(scope.isUser).toBeFalsy();
        expect(scope.isAdmin).toBeFalsy();

        expect(location.path()).toBe('/home');

    });


});