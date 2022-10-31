const express = require("express");
const { details, payment } = require("../controllers/homeController");
const router = express.Router();
const {authCookie} = require("../utils/helper")
router.get('/', (req, res) => {

    console.log('home test: ', authCookie.donationUser);
    console.log('home test1: ', req.cookies.donationUser);
    res.render('home', {title: 'air funding', auth: req.cookies.donationUser })
})
router.get('/details', details)
router.post('/create-checkout-session', payment)
module.exports = router;
