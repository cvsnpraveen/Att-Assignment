const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const pwd = Math.random().toString(36).substring(4); //random Generation Password
const role = "Organization";
const _ = require('lodash');
var nodemailer = require('nodemailer');

module.exports.create = (req, res, next) => {
    var user = new User();
    user.name = req.body.name;
    user.type = req.body.type;
    user.phone = req.body.phone;
    user.status = req.body.status;
    user.email = req.body.email;
    user.password = pwd;
    user.role = role;
    user.save((err, doc) => {
        if (!err){
            SendPassword(doc);
            res.send(doc);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
}
module.exports.deleteUser = (req, res, next) => {
    User.findOneAndRemove({_id : new mongoose.mongo.ObjectID(req.params.id)},
     function (err,user){
        if (!err){
            res.send(user);
        }
        else {
            return next(err);
        }
      });
    
}

module.exports.autenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(400).json(err);
        else if (user) return res.status(200).json({ 'token': user.generateJwt(), 'user': user });
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userDashboard = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email', 'role', 'name', 'type', 'phone', 'status', 'password']) });
        }
    );
}
module.exports.viewAllUsers = (req, res, next) => {
    User.find({ role: { $ne: "Admin" }}, (err, user) => {
        console.log("Users", user.length);
            if (!user)
                return res.status(404).json({ status: false, message: 'User not found.' });
            else
                return res.status(200).json({ status: true, user });
        }
    );
}

//SendMail
function SendPassword(user){
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cvsnpn@gmail.com',
      pass: 'praveen05#'
    }
  });

  var mailOptions = {
    from: 'cvsnpn@gmail.com',
    to: user.email,
    subject: 'My Application Credentials',
    text: 'Hello '+user.name+'!\n \n Welcome to my Application.\n Please login with the below mentioned Credentials.\n\n Username: '+user.email+' \n Password: '+user.password+'\n\n\n Thanks\nPraveen.'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}