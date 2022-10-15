const express = require("express");
const router = express.Router();
const {authCookie} = require("../utils/helper")
router.get('/', (req, res) => {

    console.log('home test: ', authCookie.donationUser);
    console.log('home test1: ', req.cookies.donationUser);
    res.render('home', {title: 'air funding', auth: req.cookies.donationUser })
})
module.exports = router;
