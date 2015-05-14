/**
 * Created by Dennnis on 12-05-2015.
 */
var facade = require('./Facade');
//
//facade.createUser('Dennis','emailtest','Abcd1234',function(err, user){
//    console.log(user)
//})

//facade.createAdmin('Martin','mailtest','Abcd1234',function(err, user){
//    console.log(user)
//})

//facade.comparePW('Dennis','Abcd1234',function(err, res){
//    console.log(res);
//})

//facade.updateUserTickets('Dennis','gruppe1','123',123,function(err,user){
//    console.log(user);
//})

//facade.removeUserTickets('Dennis','55520bafaca8b3dc28c0ef3d',function(err,data){
//    console.log(data);
//})

//facade.findUser('Dennis',function(err,user){
//    console.log(user);
//})

//facade.createAirline('gruppe 1','http://smsproject-schultz.rhcloud.com/smsSemProject/api/flights/',function(err,airline){
//    console.log(err)
//    console.log(airline)
//});
//
//facade.createAirline('gruppe 3','http://semesterproject-testnikolai1.rhcloud.com/SemesterProjectFligths/api/flights/',function(err,airline){
//    console.log(err)
//    console.log(airline)
//});
//
//facade.createAirline('gruppe 7','http://Airline7-team007.rhcloud.com/api/flights/',function(err,airline){
//    console.log(err)
//    console.log(airline)
//});

facade.get_Departure_Date('JKA',1431512436091,function(err,flights){
    console.log(err)
    console.log(flights)
})

//var customer =[{
//    firstName: 'Dennis',
//    lastName : 'Jensen',
//    city : 'Hundested',
//    country : 'Denmark',
//    street : 'Jernbanegade'
//},{
//    firstName: 'Martin',
//    lastName : 'Nielsen',
//    city : 'Lynge',
//    country : 'Denmark',
//    street : 'Amtsvejen'
//}]

//facade.post_reservation_flightID('gruppe 7','5',customer,function(err,data){
//    console.log(err)
//    console.log(data)
//
//facade.delete_Reservation('gruppe 7',552,function(err,reserv){
//    console.log(err)
//    console.log(reserv)
//})
//
//})facade.get_Departure_Date('BER',1431512436091,function(err,flights){
//    console.log(flights)
//});