const jwt = require("jsonwebtoken");
const {jwtSecret } = require("../config/config")
module.exports.userAuth = (req, res, next) => {
    const cookies = req.cookies;
    if(cookies.donationUser){
      const verified = jwt.verify(cookies.donationUser, jwtSecret);
      if(!verified) {
        res.redirect('/login');
      } else {
          next();
      }
    } else {
        res.redirect('/login');
    }
}
module.exports.publicAuth = (req, res, next) => {
  const cookies = req.cookies;
  console.log('auth: ', cookies)
    if(cookies.donationUser){
      const verified = jwt.verify(cookies.donationUser, jwtSecret);
      if(verified) {
        res.redirect('/profile');
      } else {
          next();
      }
    }
    next();
}