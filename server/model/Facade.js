/**
 * Created by Dennnis on 12-05-2015.
 */

var db = require("./db");
var mongoose = require('mongoose');
var user = mongoose.model('Customer');
var airline = mongoose.model('Airline');

function createUser(userName, email, pw) {
    var newuser = {
        userName: userName,
        email: email,
        pw: pw,
        tickets: []
    }
    user.save(newuser);
}

function findCustomer(){}

