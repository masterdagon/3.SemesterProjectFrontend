var express = require('express');
var facade = require('../model/Facade');

var router = express.Router();
router.get('/test', function(req, res) {
    res.header("Content-type","application/json");
    res.end('{"msg" : "Test Message fetched from the server, You are logged on as a User since you could fetch this data"}');
});

router.get('/:departure/:date'),function(req,res){
    var departure = req.params.departure;
    var date = req.params.date;
    facade.get_Departure_Date(departure,date,function(err,array){
        if(err){

        }else{
            res.header("Content-type","application/json");
            res.end(JSON.stringify(array));
        }
    })
}

module.exports = router;
