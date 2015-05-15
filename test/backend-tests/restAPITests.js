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
var couchdb;
var url = "http://test.com";

describe('REST API for /userApi', function () {
  //Start the Server before the TESTS
  before(function (done) {

    testServer = app.listen(testPort, function () {
      console.log("Server is listening on: " + testPort);
      done();
    })
    .on('error',function(err){
        console.log(err);
      });
  });

  beforeEach(function(done){
    user.remove({},function(){
        var newuser = {
            userName : "Bilbo",
            email : "123@gmail.com",
            pw : "testpw",
            role : "user",
            tickets : "[]"
        };
        user.create(newuser,function(err){
        })
    })
      server.remove({},function(){
          var newserver = {
              name : "Testserver",
              url : "http://test.com"
          };
          server.create(newserver,function(err){
              done();
          })
      })
  });

  after(function(){  //Stop server after the test
    //Uncomment the line below to completely remove the database, leaving the mongoose instance as before the tests
    mongoose.connection.db.dropDatabase();
    testServer.close();
  });

  it("GET: userApi/f/:departure/:date", function (done) {
      var options = {allowUnmocked: true};
      var local = nock("http://localhost:"+testPort,options)
      var couchdb = nock('http://test.com')
          .get(url+'/BER/1')
          .reply(200,[{
              airline:"Air Berlin",
              price:"1",
              flightId:"1",
              takeOffDate:"2",
              landingDate:"2",
              depature:"BER",
              destination:"CPH",
              seats:20,
              availableseats:20,
              bookingCode:true
          }]);
    http.get("http://localhost:"+testPort+"/userApi/f/BER/1",function(res){
      res.setEncoding("utf8");//response data is now a string
      res.on("data",function(chunk){
        var json = JSON.parse(chunk);
          json[0].airline.should.equal("Air Berlin");
        done();
      });
    })
  });
});
