/**
 * Created by Dennnis on 12-05-2015.
 */
var facade = require('./Facade');

//facade.createUser('Dennis','emailtest','Abcd1234',function(err, user){
//    console.log(user)
//})

facade.compare('Dennis','Abcd1231',function(err, res){
    console.log(res);
})