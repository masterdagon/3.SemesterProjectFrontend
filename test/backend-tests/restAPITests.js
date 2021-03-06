global.TEST_DATABASE = "mongodb://localhost/TestDataBase_xx1243";
global.SKIP_AUTHENTICATION = true;  //Skip security

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var testPort = 9999;
var testServer;
var mongoose = require("mongoose");
var user = mongoose.model("User");
var server = mongoose.model('Server');
var nock = require("nock");
var url = "http://test.com";
var request = require('request');

describe('REST API for /userApi', function () {
    //Start the Server before the TESTS
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
            var newuser = {
                userName: "Bilbo",
                email: "123@gmail.com",
                pw: "testpw",
                role: "user",
                tickets: "[]",
                verified: "true"
            };
            user.create(newuser, function (err) {
            })
        })
        server.remove({}, function () {
            var newserver = {
                name: "Testserver",
                url: url + "/"
            };
            server.create(newserver, function (err) {
                done();
            })
        })
    });

    after(function () {  //Stop server after the test
        //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
        mongoose.connection.db.dropDatabase();
        testServer.close();
    });

    it("GET: userApi/f/:departure/:date", function (done) {
        var options = {allowUnmocked: true};
        var local = nock("http://localhost:" + testPort, options)
            .get("/test")
            .reply(200, "OK!");
        var couchdb = nock(url)
            .get('/BER/1')
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
        http.get("http://localhost:" + testPort + "/userApi/f/BER/1", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                console.log("chunk: " + chunk)
                var json = JSON.parse(chunk);
                json[0].flights[0].airline.should.equal("Air Berlin");
                done();
            });
        })
    });

    it("GET: userApi/f/:departure/arrival/:date", function (done) {
        var options = {allowUnmocked: true};
        var local = nock("http://localhost:" + testPort, options)
            .get("/test")
            .reply(200, "OK!");
        var couchdb = nock(url)
            .get('/BER/CPH/1')
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
        http.get("http://localhost:" + testPort + "/userApi/f/BER/CPH/1", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                console.log("chunk: " + chunk)
                var json = JSON.parse(chunk);
                json[0].flights[0].airline.should.equal("Air Berlin");
                done();
            });
        })
    });

    it("GET: userApi/r/:name/:reservationID", function (done) {
        var options = {allowUnmocked: true};
        var local = nock("http://localhost:" + testPort, options)
            .get("/test")
            .reply(200, "OK!");
        var couchdb = nock(url)
            .get('/1')
            .reply(200, {
                test : "test"
            });
        http.get("http://localhost:" + testPort + "/userApi/r/Testserver/1", function (res) {
            res.setEncoding("utf8");//response data is now a string
            res.on("data", function (chunk) {
                console.log("chunk: " + chunk)
                var json = JSON.parse(chunk);
                json.test.should.equal("test");
                done();
            });
        })
    });

    it("DELETE: userApi/r/:name/:reservationID", function (done) {
        var options = {allowUnmocked: true};
        var local = nock("http://localhost:" + testPort, options)
            .get("/test")
            .reply(200, "OK!");
        var couchdb = nock(url)
            .delete('/1')
            .reply(200, {
                test : "test"
            });
        request({
            method: "DELETE",
            url: "http://localhost:9999/userApi/r/Testserver/1"
        },function(err,res,body){
            if(err){
                console.log(err)
            }else{
                var data = JSON.parse(body);
                data.test.should.equal("test");
                done();
            }
        });
    });

    it("POST: userApi/r/:name/:flightID", function (done) {
        var options = {allowUnmocked: true};
        var local = nock("http://localhost:" + testPort, options)
            .get("/test")
            .reply(200, "OK!");
        var couchdb = nock(url)
            .post('/1')
            .reply(200, {
                "test" : "test"
            });
        request({
            method: "POST",
            url: "http://localhost:9999/userApi/r/Testserver/1",
            json: {"reservationID":"1","flightID": "1","Passengers":[{"firstName":"Test","lastName":"Test","city":"Test","country":"Test","street":"Test"}],"totalPrice":25}
        },function(err,res,body){
            if(err){
                console.log(err)
            }else{
                console.log(body);
                body.test.should.equal("test");
                done();
            }
        });
    });
});
