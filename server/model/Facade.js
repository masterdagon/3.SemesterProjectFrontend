/**
 * Created by Dennnis on 12-05-2015.
 */

var db = require("./db");
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var user = mongoose.model('User');
var airline = mongoose.model('Airline');

function createUser(userName, email, pw, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(pw, salt, function (err, hash) {
            var newuser = new user({
                userName: userName,
                email: email,
                pw: hash,
                tickets: []
            });
            newuser.save(function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(err, newuser)
                }
            });
        });
    });
}

function comparePW(userName, pw, callback) {
    user.findOne({userName: userName}, function (err, foundUser) {
        if (err) {
            callback(err);
        } else {
            bcrypt.compare(pw, foundUser.pw, function (err, res) {
                callback(err, res);
            })
        }
    })
}

function findUser(userName, callback) {
    user.findOne({userName: userName}, function (err, theUser) {
        if (err) {
            callback(err)
        } else {
            callback(null, theUser)
        }
    })
}

function getAirlineUrls(callback) {
    var urls = [];
    airline.find({}, function (err, airlines) {
        if (err) {
            callback(err);
        } else {
            for (var item in airlines) {
                urls.push(item.url);
            }
            callback(err, urls);
        }
    });

}

function createAirline(name,url,callback){
    var newAirline = new airline({
        name : name,
        url : url
    });
    newAirline.save(function(err){
        if(err){
            callback(err);
        }else{
            callback(err,newAirline)
        }
    })
}

module.exports = {
    createUser: createUser,
    getAirlineUrls: getAirlineUrls,
    findUser: findUser,
    comparePW: comparePW,
    createAirline : createAirline
};

