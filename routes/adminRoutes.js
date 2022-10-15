const { Router } = require("express");
const { adminLoginPage, adminDashboard } = require("../controllers/adminController");
const router = Router();
router.get('/admin-login-page', adminLoginPage)
router.get('/admin-dashboard', adminDashboard)
module.exports = router;