const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    type: {
        type: String,
        required: 'Please choose Organization type'
    },
    phone: {
        type: String,
        required: 'Phone number can\'t be empty',
        minlength : [10,'Phone number must be 10 character long'],
        maxlength : [10,'Phone number must be 10 character long']
    },
    status: {
        type: String,
        required: 'Please choose Organization Status'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength : [4,'Password must be atleast 4 character long']
    },
    role: {
        type: String,
        required: "Role required"
    }
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

//methods
userSchema.methods.verifyPassword = function (password) {
    return (password === this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

mongoose.model('User', userSchema);