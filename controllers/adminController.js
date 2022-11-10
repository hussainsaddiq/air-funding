const ProjectModel = require("../models/Project")
module.exports.adminLoginPage = (req, res) => {
    res.render('admin/login', {title: 'admin login', auth: false, errors: [], fields: {}});
}
module.exports.adminDashboard = async (req, res) => {
    try {
        const projects = await ProjectModel.find();
        console.log('projects: ', projects);
        res.render('admin/admin-dashboard',{title: 'all projects', auth: false,projects})

    } catch (error) {
        console.log(error.message);
    }
}
module.exports.details = async (req, res) => {
    const {id} = req.params;
    try {
        const project = await ProjectModel.findOne({_id: id});
        console.log('projects: ', project);
        res.render('admin/details',{title: 'all projects', auth: false,project})
    } catch (error) {
        console.log(error.message);
    }
}
module.exports.reject = async (req, res) => {
       const {id, num} = req.params;
        res.render('admin/reject',{title: 'reject', id, num})
}
module.exports.message = async (req, res) => {
    const {message} = req.body;
    const {id, status} = req.query;
    try {
        const response = await ProjectModel.findOneAndUpdate({_id: id}, {status: parseInt(status), message});
        res.render('admin/admin-dashboard',{title: 'all projects', auth: false,projects: []})
    } catch (error) {
        console.log(error.message);
        
    }
}
module.exports.logout = (req, res) => {
    res.clearCookie('admin');
    res.redirect('/admin-login-page');
}
