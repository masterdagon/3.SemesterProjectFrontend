/**
 * Created by Dennnis on 12-05-2015.
 */

var db = require("./db");
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var user = mongoose.model('User');
var airline = mongoose.model('Airline');
var request = require('request');

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
function removeUserTickets(userName, ticketID, callback) {
    user.findOneAndUpdate({userName: userName},
        {$pull: {tickets: {_id: ticketID}}}, function (err, data) {
            callback(err, data);
        });
}

function updateUserTickets(userName, airline, flightInstanceID, reservationID, callback) {
    var item = {
        airline: airline,
        flightInstanceID: flightInstanceID,
        ReservationsID: reservationID
    };

    user.findOneAndUpdate({userName: userName}, {
        $push: {tickets: item}
    }, function (err, user) {
        callback(err, user);
    })
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
            //for (var i in airlines) {
            //    urls.push(airlines[i].url);
            //}
            callback(err, airlines);
        }
    });

}

function createAirline(name, url, callback) {
    console.log('name= ' + name)
    console.log('url= ' + url)
    var newAirline = new airline({
        name: name,
        url: url
    });
    newAirline.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(err, newAirline)
        }
    })
}

function get_Departure_Date(departure, date, callback) {
    getAirlineUrls(function (err, airlines) {
        if (err) {
            callback(err)
        } else {
            var storage = [];
            count=0;
            airlines.forEach(function(airline){
                var path = airline.url + departure + "/" + date;
                console.log(path)
                console.log(count)
                request(path, function (err, res, body) {
                    if (!err && res.statusCode == 200) {
                        var flight ={name: airline.name, flights: body};
                        storage.push(flight);
                        if (count == airlines.length - 1) {
                            callback(null, storage);
                        }
                    }
                })
                count++;
            })

            //for (var count = 0; count < airlines.length; count++) {
            //    var path = airlines[count].url + departure + "/" + date;
            //    request(path, function (err, res, body) {
            //        console.log(count)
            //        if (!err && res.statusCode == 200) {
            //            console.log(count)
            //            var flight ={name: airlines[count].name, flights: body};
            //            storage.push(flight);
            //            if (count == airlines.length - 1) {
            //                callback(null, storage);
            //            }
            //        }
            //    })
            //}
        }

    })
}

module.exports = {
    createUser: createUser,
    getAirlineUrls: getAirlineUrls,
    findUser: findUser,
    comparePW: comparePW,
    createAirline: createAirline,
    updateUserTickets: updateUserTickets,
    removeUserTickets: removeUserTickets,
    get_Departure_Date: get_Departure_Date
};

