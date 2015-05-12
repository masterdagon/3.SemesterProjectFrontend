/**
 * Created by Dennnis on 12-05-2015.
 */

var db = require("./db");
var mongoose = require('mongoose');
var user = mongoose.model('User');
var airline = mongoose.model('Airline');

function createUser(userName, email, pw) {
    var newuser = {
        userName: userName,
        email: email,
        pw: pw,
        tickets: []
    };
    user.save(newuser);
}

function findUser(userName,callback){
    wiki.findOne({userName: userName}, function (err, theUser) {
        if (err) {
            callback(err)
        } else {
            callback(null, theUser)
        }
    })

}



module.exports = {
    createUser : createUser
};

