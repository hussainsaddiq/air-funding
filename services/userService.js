const User = require("../models/User")

module.exports.findUser = (id) => {
    return User.findById(id).then(function(user) {
        if(user) {
            return user;
        }
    }).catch(function(error) {
        console.log(error.message)
    })
}