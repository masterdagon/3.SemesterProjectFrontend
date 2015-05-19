var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var facade = require('../model/Facade')
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "Cl14dat1a14f",
        pass: "Cl14dat1a14f2015"
    }
});
var rand,mailOptions,host,link;

router.post('/send',function(req,res){
    facade.createUser(req.body.userName,req.body.email,req.body.pw,function(err,user){
        console.log(user)
        if(user != undefined){
            host=req.get('host');
            console.log(host);
            link="http://"+req.get('host')+"/verify?id="+user._id;
            mailOptions={
                to : user.email,
                subject : "Please confirm your Email account",
                html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
            }
            console.log(mailOptions);
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                    res.end("error");
                }else{
                    console.log("Message sent: " + response.message);
                    res.end("sent");
                }
            });
        }else{
            res.end("The user already exist");
        }
    })
});

router.get('/verify',function(req,res){
        console.log("Domain is matched. Information is from Authentic email");
        facade.findUserById(req.query.id,function(err,user){
            console.log(err)
            console.log(user)
            if(!err)
            {
                facade.updateVerified(user.userName,function(err,updatedUser){
                    console.log("email is verified");
                    res.end("<h1>Email "+user.email+" is been Successfully verified");
                })
            }
            else
            {

                console.log("email is not verified");
                res.end("<h1>Bad Request</h1>");
            }
        })


});

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect("app/index.html")
});


router.post('/authenticate', function (req, res) {
        facade.comparePW(req.body.username, req.body.password,function(err,bol,user){
            if(err){
                res.status(401).send('Wrong user or password');
                return;
            }else{
                if(user.verified){
                    if (bol) {
                        console.log(bol)
                        var profile = {
                            username: user.userName,
                            role: user.role,
                            id: user._id
                        };
                        // We are sending the profile inside the token
                        console.log(user.role == 'user')
                        console.log(user.role == 'admin')
                        if(user.role == 'user'){
                            var token = jwt.sign(profile, require("../security/secrets").secretTokenUser, {expiresInMinutes: 60 * 5});
                        }
                        if(user.role == 'admin'){
                            var token = jwt.sign(profile, require("../security/secrets").secretTokenAdmin, { expiresInMinutes: 60*5 });
                        }
                        res.json({token: token});
                        return;
                    }
                    else{
                        res.status(401).send('Wrong user or password');
                        return;
                    }
                }else{
                    res.status(401).send('the user is not authenticate please locate email and confirm your user');
                    return;
                }
            }
        })
});



//Get Partials made as Views
router.get('/partials/:partialName', function(req, res) {
  var name = req.params.partialName;
  res.render('partials/' + name);
});

module.exports = router;
















//router.post('/authenticate', function (req, res) {
//    //TODO: Go and get UserName Password from "somewhere"
//    //if is invalid, return 401
//    if (req.body.username === 'user1' && req.body.password === 'test') {
//        var profile = {
//            username: 'user1',
//            role: "user",
//            id: 1000
//        };
//        // We are sending the profile inside the token
//        var token = jwt.sign(profile, require("../security/secrets").secretTokenUser, { expiresInMinutes: 60*5 });
//        res.json({ token: token });
//        return;
//    }
//
//    if (req.body.username === 'admin1' && req.body.password === 'test') {
//        var profile = {
//            username: 'admin1',
//            role: "admin",
//            id: 123423
//        };
//        // We are sending the profile inside the token
//        var token = jwt.sign(profile, require("../security/secrets").secretTokenAdmin, { expiresInMinutes: 60*5 });
//        res.json({ token: token });
//        return;
//    }
//
//    else{
//        res.status(401).send('Wrong user or password');
//        return;
//    }
//});
