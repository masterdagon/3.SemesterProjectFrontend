describe('Factory Tests',function(){
    beforeEach(module('airportApp.factories'));
    describe('indexFactory',function(){
        var scope,factory,httpBackend;
        var http = null;
        beforeEach(inject(function($httpBackend,$rootScope,indexFactory){
            httpBackend = $httpBackend;
            scope = $rootScope.$new();
            factory = indexFactory;
            httpBackend.whenPOST("/send").respond("test");
            httpBackend.whenPOST("/check").respond("true");
        }));
        afterEach(function(){
            if(http == true){
                httpBackend.flush()
            }
        });

        it("InfoFactory: all methods should be defined",function(){
            expect(factory.saveUser).toBeDefined();
            expect(factory.checkUserEmail).toBeDefined();
            http = false;
        });

        it("saveUser",function(){
            factory.saveUser("test")
                .success(function(user){
                    expect(user).toBe("test");
                });
            http = true;
        });

        it("checkUserEmail",function(){
            factory.checkUserEmail("test","test")
                .success(function(verified){
                    expect(verified).toBe("true");
                });
            http = true;
        });
    })
    describe('userFactory',function(){
        var scope,factory,httpBackend;
        var http = null;
        beforeEach(inject(function($httpBackend,$rootScope,userFactory){
            httpBackend = $httpBackend;
            scope = $rootScope.$new();
            factory = userFactory;
            //getUser
            httpBackend.whenGET("/userApi/u/userName").respond("test");
            //getDepartureDate
            httpBackend.whenGET("/userApi/f/departure/date").respond("test");
            //getDepartureDateArrival
            httpBackend.whenGET("/userApi/f/departure/arrival/date").respond("test");
            //getReservation
            httpBackend.whenGET("/userApi/r/name/rID").respond("test");
            //postReservation
            httpBackend.whenPOST("/userApi/r/name/flightID/userName").respond("test");
            //deleteReservation
            httpBackend.whenDELETE("/userApi/r/name/rID/userName/ticketID").respond("test");

        }));
        afterEach(function(){
            if(http == true){
                httpBackend.flush()
            }
        });

        it("InfoFactory: all methods should be defined",function(){
            expect(factory.getUser).toBeDefined();
            expect(factory.getDepartureDate).toBeDefined();
            expect(factory.getDepartureDateArrival).toBeDefined();
            expect(factory.getReservation).toBeDefined();
            expect(factory.postReservation).toBeDefined();
            expect(factory.deleteReservation).toBeDefined();
            http = false;
        });

        it("getUser",function(){
            factory.getUser("userName")
                .success(function(user){
                    expect(user).toBe("test");
                });
            http = true;
        });

        it("getDepartureDate",function(){
            factory.getDepartureDate("departure","date")
                .success(function(flight){
                    expect(flight).toBe("test");
                });
            http = true;
        });

        it("getDepartureDateArrival",function(){
            factory.getDepartureDateArrival("departure","arrival","date")
                .success(function(flight){
                    expect(flight).toBe("test");
                });
            http = true;
        });

        it("getReservation",function(){
            factory.getReservation("name","rID")
                .success(function(reservation){
                    expect(reservation).toBe("test");
                });
            http = true;
        });

        it("postReservation",function(){
            factory.postReservation("name","flightID","passengers","userName")
                .success(function(reservation){
                    expect(reservation).toBe("test");
                });
            http = true;
        });

        it("deleteReservation",function(){
            factory.deleteReservation("name","rID","userName","ticketID")
                .success(function(reservation){
                    expect(reservation).toBe("test");
                });
            http = true;
        });
    })
});