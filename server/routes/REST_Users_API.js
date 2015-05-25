var express = require('express');
var facade = require('../model/Facade');

var router = express.Router();
router.get('/test', function(req, res) {
    res.header("Content-type","application/json");
    res.end('{"msg" : "Test Message fetched from the server, You are logged on as a User since you could fetch this data"}');
});

router.get('/f/:departure/:date',function(req,res){
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" database not available)");
        return;
    }else {
        var departure = req.params.departure;
        var date = req.params.date;
        console.log("Departure: " + departure);
        console.log("Date: " + date);

        facade.get_Departure_Date(departure, date, function (err, array) {
            if (err) {
                res.status(404);
                res.end(JSON.stringify(err));
            } else {
                res.header("Content-type", "application/json");
                res.end(JSON.stringify(array));
            }
        })
    }
});

router.get('/f/:departure/:arrival/:date',function(req,res){
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" database not available)");
        return;
    }else {
        var departure = req.params.departure;
        var arrival = req.params.arrival;
        var date = req.params.date;
        facade.get_Departure_Arrival_Date(departure, arrival, date, function (err, array) {
            if (err) {
                res.status(404);
                res.end(JSON.stringify(err));
            } else {
                res.header("Content-type", "application/json");
                res.end(JSON.stringify(array));
            }
        })
    }
});

router.get('/r/:name/:reservationID',function(req,res){
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" database not available)");
        return;
    }else {
        var rID = req.params.reservationID;
        var name = req.params.name;
        facade.get_Reservation(name, rID, function (err, json) {
            if (err) {
                res.status(404);
                res.end(JSON.stringify(err));
            } else {
                res.header("Content-type", "application/json");
                res.end(JSON.stringify(json));
            }
        })
    }
});

router.post('/r/:name/:flightID',function(req,res){
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" database not available)");
        return;
    }else {
        var fID = req.params.flightID;
        var name = req.params.name;
        var customers = req.body;
        facade.post_reservation_flightID(name, fID, customers, function (err, json) {
            if (err) {
                res.status(404);
                res.end(JSON.stringify(err));
            } else {
                res.header("Content-type", "application/json");
                res.end(JSON.stringify(json));
            }
        })
    }
});

router.delete('/r/:name/:reservationID',function(req,res){
    console.log('tester')
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" database not available)");
        return;
    }else {
        var name = req.params.name;
        var rID = req.params.reservationID;
        facade.delete_Reservation(name, rID, function (err, json) {
            if (err) {
                res.status(404);
                res.end(JSON.stringify(err));
            } else {
                res.header("Content-type", "application/json");
                res.end(JSON.stringify(json));
            }
        })
    }
});

router.get('/u/:name',function(req,res){
    var username = req.params.name;
    facade.findUser(username,function(err,user){
        if(err) {
            res.status(404);
            res.end(JSON.stringify(err))
        }
            else{
            res.header("Content-type", "application/json");
            res.end(JSON.stringify(user));
            }

    })
})

module.exports = router;
