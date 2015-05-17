global.TEST_DATABASE = "mongodb://localhost/TestDataBase_xx1243";
global.SKIP_AUTHENTICATION = true;  //Skip security

var should = require("should");
var app = require("../../server/app");
var facade = require("../../server/model/Facade");
var testPort = 9999;
var testServer;
var mongoose = require("mongoose");
var user = mongoose.model("User");
var server = mongoose.model('Server');
var nock = require("nock");
var url = "http://test.com";
var bcrypt = require('bcryptjs');

describe('facade for db', function () {
    //Start the Server before the TESTS
    var bilboID = null;
    var bilboTicketID = null;
    before(function (done) {

        testServer = app.listen(testPort, function () {
            console.log("Server is listening on: " + testPort);
            done();
        })
            .on('error', function (err) {
                console.log(err);
            });
    });

    beforeEach(function (done) {
        user.remove({}, function () {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash('testpw', salt, function (err, hash) {
                    var newuser = new user({
                        userName: "Bilbo",
                        email: "123@gmail.com",
                        pw: hash,
                        role: "user",
                        tickets: [{
                            airline: 'testAir',
                            flightInstanceID: 'airID',
                            ReservationsID: 12345
                        }],
                        verified: false
                    });
                    newuser.save(function (err, user) {
                        bilboID = user._id;
                        bilboTicketID = user.tickets[0]._id;
                        server.remove({}, function () {
                            var newserver = new server({
                                name: "Testserver",
                                url: url + "/"
                            });
                            newserver.save(function () {
                                done();
                            })
                        })
                    });
                })
            })
        })
    });

    after(function () {  //Stop server after the test
        //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
        mongoose.connection.db.dropDatabase();
        testServer.close();
    });

    describe('createUser', function () {
        var testUser = null;
        before(function (done) {
            facade.createUser('test', 'email', 'test', function (err, user) {
                testUser = user;
                done()
            })
        });
        it('createUser userName should equal test and role = user', function () {
            testUser.userName.should.equal('test');
            testUser.role.should.equal('user')
        })
    });

    describe('createAdmin', function () {
        var testUser = null;
        before(function (done) {
            facade.createAdmin('testAdmin', 'email', 'test', function (err, user) {
                testUser = user;
                done()
            })
        });
        it('createAdmin userName should equal testAdmin, and role = admin', function () {
            testUser.userName.should.equal('testAdmin');
            testUser.role.should.equal('admin')
        })
    });

    describe('findUser', function () {
        var testUser = null;
        before(function (done) {
            facade.findUser('Bilbo', function (err, user) {
                testUser = user;
                done()
            })
        });
        it('findUser with userName Bilbo', function () {
            testUser.userName.should.equal('Bilbo')
        })
    });

    describe('comparePW', function () {
        var testUser = null;
        var bool = false;
        before(function (done) {
            facade.comparePW('Bilbo', 'testpw', function (err, bol, user) {
                testUser = user;
                bool = bol;
                done()
            })
        });
        it('compare PW with userName Bilbo and password testpw', function () {
            bool.should.equal(true);
            testUser.userName.should.equal('Bilbo')
        })
    });

    describe('createServer', function () {
        var testServer = null;
        before(function (done) {
            facade.createServer('testGroup', 'www.test.dk', function (err, server) {
                testServer = server;
                done()
            })
        });
        it('createServer with name testGroup, and url = www.test.dk', function () {
            testServer.name.should.equal('testGroup');
            testServer.url.should.equal('www.test.dk')
        })
    });

    describe('updateUserTickets', function () {
        var testUser = null;
        before(function (done) {
            facade.updateUserTickets('Bilbo','testAir','testid',1234, function (err, user) {
                testUser = user;
                done()
            })
        });
        it('if updateUserTickets is succes then it returns userName Bilbo', function () {
            testUser.userName.should.equal('Bilbo');
        })
    });

    describe('removeUserTickets', function () {
        var testUser = null;
        before(function (done) {
            facade.removeUserTickets('Bilbo',bilboTicketID, function (err, user) {
                testUser = user;
                done()
            })
        });
        it('if removeUserTickets is succes then it returns userName Bilbo', function () {
            testUser.userName.should.equal('Bilbo');
        })
    });

    describe('get_Departure_Date', function () {
        var f = null;
        before(function (done) {
            var couchdb = nock(url)
                .get('/BER/2')
                .reply(200, [{
                    airline: "Air Berlin",
                    price: "1",
                    flightId: "1",
                    takeOffDate: "2",
                    landingDate: "2",
                    depature: "BER",
                    destination: "CPH",
                    seats: 20,
                    availableseats: 20,
                    bookingCode: true
                }]);
            facade.get_Departure_Date('BER','2', function (err, flight) {
                f = flight;
                done()
            })
        });
        it('get_Departure_Date returns array of flights size 1 with airline = Air Berlin', function () {
            f.length.should.equal(1);
            f[0].flights[0].airline.should.equal('Air Berlin');
        })
    });

    describe('get_Departure_Arrival_Date', function () {
        var f = null;
        before(function (done) {
            var couchdb = nock(url)
                .get('/BER/CPH/2')
                .reply(200, [{
                    airline: "Air Berlin",
                    price: "1",
                    flightId: "1",
                    takeOffDate: "2",
                    landingDate: "2",
                    depature: "BER",
                    destination: "CPH",
                    seats: 20,
                    availableseats: 20,
                    bookingCode: true
                }]);
            facade.get_Departure_Arrival_Date('BER','CPH','2', function (err, flight) {
                f = flight;
                done()
            })
        });
        it('get_Depature_Arrival_Date should return array of flights lengt 1 and airline = Air Berlin', function () {
            f.length.should.equal(1);
            f[0].flights[0].airline.should.equal('Air Berlin');
        })
    });
    //
    //describe('get_Reservation', function () {
    //    var testServer = null
    //    before(function (done) {
    //        facade.createServer('testGroup', 'www.test.dk', function (err, server) {
    //        })
    //    })
    //    it('', function () {
    //
    //    })
    //})
    //
    //describe('post_reservation_flightID', function () {
    //    var testServer = null
    //    before(function (done) {
    //        facade.createServer('testGroup', 'www.test.dk', function (err, server) {
    //        })
    //    })
    //    it('', function () {
    //
    //    })
    //})
    //
    //describe('delete_Reservation', function () {
    //    var testServer = null
    //    before(function (done) {
    //        facade.createServer('testGroup', 'www.test.dk', function (err, server) {
    //        })
    //    })
    //    it('', function () {
    //
    //    })
    //})

    describe('updateVerified', function () {
        var testUser = null;
        before(function (done) {
            facade.updateVerified('Bilbo',function (err, user) {
                testUser = user;
                done()
            })
        });
        it('UpdateVerified of Bilbo should return userName Bilbo', function () {
            testUser.userName.should.equal('Bilbo');
        })
    });

    describe('findUserById', function () {
        var testUser = null;
        before(function (done) {
            facade.findUserById(bilboID, function (err, user) {
                testUser = user;
                done()
            })
        });
        it('find user by id should return userName bilbo from bilbosId', function () {
            testUser.userName.should.equal('Bilbo')
        })
    })
});