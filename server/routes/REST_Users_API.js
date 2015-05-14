var express = require('express');
var facade = require('../model/Facade');

var router = express.Router();
router.get('/test', function(req, res) {
    res.header("Content-type","application/json");
    res.end('{"msg" : "Test Message fetched from the server, You are logged on as a User since you could fetch this data"}');
});

router.get('/f/:departure/:date'),function(req,res){
    var departure = req.params.departure;
    var date = req.params.date;
    facade.get_Departure_Date(departure,date,function(err,array){
        if(err){

        }else{
            res.header("Content-type","application/json");
            res.end(JSON.parse(array));
        }
    })
};

router.get('/f/:departure/:arrival/:date',function(req,res){
    var departure = req.params.departure;
    var arrival = req.params.arrival;
    var date = req.params.date;
    facade.get_Departure_Arrival_Date(departure,arrival,date,function(err,array){
        if(err){

        }else{
            res.header("Content-type","application/json");
            res.end(JSON.parse(array));
        }
    })
});

router.get('/r/:name/:reservationID',function(req,res){
    var rID = req.params.reservationID;
    var name = req.params.name;
    facade.get_Reservation(name,rID,function(err,json){
        if(err){

        }else{
            res.header("Content-type","application/json");
            res.end(JSON.parse(json));
        }
    })
});

router.post('/r/:name/:flightID',function(req,res){
    var fID = req.params.flightID;
    var name = req.params.name;
    var customers = JSON.parse(req.body);
    facade.post_reservation_flightID(name,fID,customers,function(err,json){
        if(err){

        }else{
            res.header("Content-type","application/json");
            res.end(JSON.parse(json));
        }
    })
});

router.delete('/r/:name/:reservationID',function(req,res){
    var name = req.params.name;
    var rID = req.params.reservationID;
    facade.delete_Reservation(name,rID,function(err,json){
        if(err){

        }else{
            res.header("Content-type","application/json");
            res.end(JSON.parse(json));
        }
    })
});

module.exports = router;
