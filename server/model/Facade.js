/**
 * Created by Dennnis on 12-05-2015.
 */

var db = require("./db");
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var user = mongoose.model('User');
var server = mongoose.model('Server');
var request = require('request');

function createUser(userName, email, pw, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(pw, salt, function (err, hash) {
            var newuser = new user({
                userName: userName,
                email: email,
                pw: hash,
                role: 'user',
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

function createAdmin(userName, email, pw, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(pw, salt, function (err, hash) {
            var newuser = new user({
                userName: userName,
                email: email,
                pw: hash,
                role: 'admin',
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

function getServerUrls(callback) {
    var urls = [];
    server.find({}, function (err, server) {
        if (err) {
            callback(err);
        } else {
            callback(err, server);
        }
    });

}

function createServer(name, url, callback) {
    console.log('name= ' + name)
    console.log('url= ' + url)
    var newServer = new airline({
        name: name,
        url: url
    });
    newServer.save(function (err) {
        if (err) {
            callback(err);
        } else {
            callback(err, newServer)
        }
    })
}
function post_reservation_flightID(name, flightId, customer, callback) {
    server.findOne({name: name}, function (err, server) {
        if (!err) {
            if(!server){
                callback({code: 404, message: 'cant find server', description:'the server was not available' })
            }else{
                var path = server.url + flightId;
                console.log(path)
                request({
                        url: path,
                        method: 'POST',
                        json: customer
                    }, function (err, res, body) {
                        console.log(body)
                        if (!err && res.statusCode == 200) {
                            callback(null, body);
                        } else {
                            callback(err);
                        }
                    }
                );
            }
        } else {
            callback(err)

        }
    })
}

function get_Departure_Date(departure, date, callback) {
    getAirlineUrls(function (err, servers) {
        if (err) {
            callback(err)
        } else {
            var storage = [];
            var count = 0;
            servers.forEach(function (server) {
                var path = server.url + departure + "/" + date;
                request(path, function (err, res, body) {
                    if(err){
                        callback(err)
                    }else {
                        if (res.statusCode == 200) {
                            var flight = {name: server.name, flights: JSON.parse(body)};
                            if (flight.flights.length > 0) {
                                storage.push(flight);
                            }

                        }
                        count++;
                        if (count == servers.length) {
                            if (storage.length > 0) {
                                callback(null, storage);
                            } else {
                                callback(JSON.parse(body));
                            }
                        }
                    }
                })
            })
        }
    })
}

function get_Departure_Arrival_Date(departure, arrival, date, callback) {
    getAirlineUrls(function (err, servers) {
        if (err) {
            callback(err)
        } else {
            var storage = [];
            var count = 0;
            servers.forEach(function (server) {
                var path = server.url + departure + "/" + arrival + "/" + date;
                request(path, function (err, res, body) {
                    if(err){
                        callback(err)
                    }else{
                        if (res.statusCode == 200) {
                            var flight = {name: server.name, flights: JSON.parse(body)};
                            if(flight.flights.length > 0){
                                storage.push(flight);
                            }
                        }
                        count++;
                        if (count == servers.length) {
                            if(storage.length>0){
                                callback(null, storage);
                            }else{
                                callback(JSON.parse(body));
                            }
                        }
                    }
                })
            })
        }

    })
}

function get_Reservation(name, reservationId, callback) {
    server.findOne({name: name}, function (err, server) {
        if (!err) {
            if(!server){
                callback({code: 404, message: 'Invalid ReservationID', description:'the reservation could not be found' })
            }else{
                var path = server.url + reservationId;
                request(path, function (err, res, body) {
                    if (!err && res.statusCode == 200) {
                        callback(null, JSON.parse(body));
                    } else {
                        callback(JSON.parse(body));
                    }
                })
            }
        }else{
            callback(err)
        }
    });
}

function delete_Reservation(name, reservationId, callback) {
    server.findOne({name: name}, function (err, server) {
        if(!err){
            if (!server) {
                callback({code: 404, message: 'Invalid ReservationID', description:'the reservation could not be found' })
            } else {
                var path = server.url + reservationId;
                request.del(path, function (err, res, body) {
                    if(err){
                        callback(err)
                    }else{
                        if (!err && res.statusCode == 200) {
                            callback(null, JSON.parse(body))
                        } else {
                            callback(JSON.parse(body));
                        }
                    }
                })
            }
        }else{
            callback(err)
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
    get_Departure_Date: get_Departure_Date,
    get_Departure_Arrival_Date: get_Departure_Arrival_Date,
    get_Reservation: get_Reservation,
    post_reservation_flightID: post_reservation_flightID,
    get_Reservation: get_Reservation,
    delete_Reservation: delete_Reservation
};

