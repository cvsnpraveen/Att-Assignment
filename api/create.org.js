const mongoose = require('mongoose');
//const organization = mongoose.model('organization');
const pwd = Math.random().toString(36).substring(4);

module.exports.create = (req, res, next) => {
    var Org = new organization();
    Org.orgName = req.body.orgName;
    Org.orgType = req.body.orgType;
    Org.phone = req.body.phone;
    Org.status = req.body.status;
    Org.email = req.body.email;
    Org.password = pwd;
    Org.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
}
const User = mongoose.model('User');

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        console.log("Err", err);
        console.log("doc", doc);
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}