const jwt = require("jsonwebtoken");
const {jwtSecret } = require("../config/config")
module.exports.userAuth = (req, res, next) => {
    const cookies = req.cookies;
    console.log('user cookie: ', cookies);
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
module.exports.adminAuth = (req, res, next) => {
  const cookies = req.cookies;
  console.log('admin cookie: ',cookies);
  if(cookies.admin){
    const verified = jwt.verify(cookies.admin, jwtSecret);
    if(!verified) {
      res.redirect('/admin-login-page');
    } else {
        next();
    }
  } else {
      res.redirect('/admin-login-page');
  }
}
