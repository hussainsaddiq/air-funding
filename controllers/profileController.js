const jwtDecode = require("jwt-decode")
const {validationResult} = require("express-validator")
const bcrypt = require("bcrypt");
const { authCookie } = require("../utils/helper");
const {findUser} = require("../services/userService")
const User = require("../models/User")

module.exports.profile = (req, res) => {
        res.render("users/profile", {title: 'profile', auth: req.cookies.donationUser, user: req.user, fields: {password: '', newPassword: ''}});
}
module.exports.updatePasswordPage = (req, res) => {
        res.render("users/changePassword", {title: 'Change password', auth: req.cookies.donationUser, user: req.user, errors: [],fields: {password:'', newPassword: ''}});
}
module.exports.postPassword = async (req, res) => {
    const id = jwtDecode(req.cookies.donationUser);
    const errors = validationResult(req);
    const {password, newPassword} = req.body;
    console.log('user id: ', id.id)
    if(errors.isEmpty()) {
       const user = await findUser(id.id)
       const compared = await bcrypt.compare(password, user.password);
       console.log('password result: ', compared)
       if(compared) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(newPassword, salt);
       
          const response = await User.findByIdAndUpdate(id.id, {password: hashed}, {new: true})
          if(response) {
           
                res.render("users/profile", {title: 'profile', auth: req.cookies.donationUser, user: req.user, fields: {password: '', newPassword: ''}});
          }
       } else {
        
            res.render("users/changePassword", {title: 'Change password', auth: req.cookies.donationUser, user: req.user, errors: [{msg: 'Password does not matched'}], fields: {password, newPassword}});
       }
    } else {
            res.render("users/changePassword", {title: 'Change password', auth: req.cookies.donationUser, user: req.user, errors: errors.array(), fields: {password, newPassword}});
    }
    
}