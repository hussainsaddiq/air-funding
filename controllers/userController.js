const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User");
const {jwtSecret} = require("../config/config");
const { authCookie } = require("../utils/helper");
module.exports.register = (req, res) => {
    res.render('auth/register', {title: 'register', errors: [],fields: {}, auth: req.cookies.donationUser});
}
module.exports.createUser = (req, res) => {
     const errors = validationResult(req);
     const {name, email, password} = req.body;
     if(errors.isEmpty()) {
            //  check user in the database
            User.findOne({email}).then((response) => {
            if(!response) {
                bcrypt.genSalt(10, function(error, salt) {
                    bcrypt.hash(password, salt, function(error, hash){
                       User.create({
                           name,
                           email,
                           password: hash,
                        //    admin: true
                       }).then((response) => {
                           console.log(response)
                           const token = jwt.sign({id: response._id}, jwtSecret, {expiresIn: '7d'})
                           console.log('my token: ', token)
                           res.cookie("donationUser", token, {maxAge: 7 * 60 * 60 * 1000, httpOnly: true});
                        res.redirect('/profile');
                       }).catch((error) => {
                           console.log(error.message)
                       })
                    })
                })
                
            }  else {
                res.render('auth/register', {title: 'register', errors: [{param: 'email', msg: `${email} is already exist`}], fields: req.body,auth: req.cookies.donationUser});
            }
            }).catch((error) => {
                console.log(error.message)
            })
     } else {
         console.log(errors.array());
         console.log(req.body)
         res.render('auth/register', {title: 'register', errors: errors.array(), fields: req.body,auth: req.cookies.donationUser});
     }
}
module.exports.login = (req, res) => {
    res.render('auth/login', {title: 'login', auth: false, errors: [], fields: {}})
}
module.exports.loginUser = (req, res) => {
    const errors = validationResult(req);
    const {email, password} = req.body;
    const {adminOption} = req.query;
    if(errors.isEmpty()){
        User.findOne({email}).then(function(response) {
            if(response) { 
                bcrypt.compare(password, response.password, function(err, result) {
                    if(result) {
                        const token = jwt.sign({id: response._id}, jwtSecret, {expiresIn: '7d'})
                        const admin = response.admin;
                        console.log(admin);
                        if(admin) {
                            res.cookie("admin", token, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true});
                            res.redirect('/admin-dashboard');
                        } else {
                            res.cookie("donationUser", token, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true});
                            res.redirect('/profile');
                        }
                        
                    } else {
                        res.render('auth/login', {title: 'login', auth: false, errors: [{param: 'password', msg: `password is not matched!`}], fields: req.body})
                    }
                })
            } else {
                res.render('auth/login', {title: 'login', auth: false, errors: [{param: 'email', msg: `${email} is not found!`}], fields: req.body})
            }
        }).catch(function(error) {
            console.log(error.message)
        })
    } else {
        if(adminOption) {
            res.render('admin/login', {title: 'admin login', auth: false, errors: errors.array(), fields: req.body})
        } else {
            res.render('auth/login', {title: 'login', auth: false, errors: errors.array(), fields: req.body})
        }
        
    }
}
module.exports.logout = (req, res) => {
    res.clearCookie('donationUser');
    res.redirect('/login');
}