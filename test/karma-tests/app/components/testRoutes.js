describe("Testing Routes", function () {

    describe("test createUser route", function () {

        var scope, location, route;

        beforeEach(module('airportApp'));

        beforeEach(inject(function($route, $location, $rootScope, $httpBackend) {
                $httpBackend.expectGET("app/AllViews/createUser.html").respond("");
                $httpBackend.expectGET("app/AllViews/home.html").respond("");
                scope = $rootScope;
                location = $location;
                route = $route;
            })
        );


        it('should give the given controller and html, from the path url', function () {
            console.log(route)
            expect(route.current).toBeUndefined();
            location.path('/createUser');
            scope.$digest();

            expect(route.current.templateUrl).toBe('app/AllViews/createUser.html');
            expect(route.current.controller).toBe("createUserCtrl");


        });

    });

    describe("test unknown route", function () {

        var scope, location, route;

        beforeEach(module('airportApp'));

        beforeEach(inject(function($route, $location, $rootScope, $httpBackend) {
                $httpBackend.expectGET("app/AllViews/home.html").respond("");
                scope = $rootScope;
                location = $location;
                route = $route;
            })
        );

        it("should redirect to /home if an unknown path is given", function () {
            expect(route.current).toBeUndefined();
            location.path('/UnknownPATH');
            scope.$digest();
            console.log('location is ' +location.path())
            expect(location.path()).toBe('/home');
            expect(route.current.templateUrl).toEqual('app/AllViews/home.html');

        });

    });

});



