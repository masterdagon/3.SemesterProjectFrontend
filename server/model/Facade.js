/**
 * Created by Dennnis on 12-05-2015.
 */

var db = require("./db");
var mongoose = require('mongoose');
var user = mongoose.model('User');
var airline = mongoose.model('Airline');

function createUser(userName, email, pw,callback) {
    var newuser = new user({
        userName: userName,
        email: email,
        pw: pw,
        tickets: []
    });
    newuser.save(function(err){
        if(err){
            callback(err);
        }else{
            callback(err,newuser)
        }
    });

}

function getAirlineUrls(callback){
    var urls = [];
    airline.find({},function(err,airlines){
        if(err){
            callback(err);
        }else{
            for(var item in airlines){
                urls.push(item.url);
            }
            callback(err,urls);
        }
    });

}

module.exports = {
    createUser : createUser,
    getAirlineUrls : getAirlineUrls
};

