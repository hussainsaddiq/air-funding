module.exports.authCookie = (req, res) => {
    const cookies = req.cookies;
if(!cookies.donationUser) {
    return cookies = false;
} else {
    return cookies;
}
}