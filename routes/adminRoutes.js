const { Router } = require("express");
const { adminLoginPage, adminDashboard, details, reject, message } = require("../controllers/adminController");
const router = Router();
router.get('/admin-login-page', adminLoginPage)
router.get('/admin-dashboard', adminDashboard)
router.get('/details/:id', details);
router.get('/reject/:id', reject)
router.post('/reject', message)
module.exports = router;