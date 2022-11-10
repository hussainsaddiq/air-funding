const { Router } = require("express");
const { adminLoginPage, adminDashboard, details, reject, message, logout } = require("../controllers/adminController");
const { adminAuth } = require("../utils/userAuth");
const router = Router();
router.get('/admin-login-page', adminLoginPage)
router.get('/admin-dashboard', adminAuth, adminDashboard)
router.get('/details/:id',adminAuth, details);
router.get('/reject/:id/:num', adminAuth,reject)
router.post('/reject', adminAuth,message)
router.get('/admin-logout', logout)
module.exports = router;