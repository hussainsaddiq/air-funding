module.exports.adminLoginPage = (req, res) => {
    res.render('admin/login', {title: 'admin login', auth: false, errors: [], fields: {}});

}
module.exports.adminDashboard = (req, res) => {
    res.render('admin/admin-dashboard',{title: 'admin dashboard', auth: false,})
}