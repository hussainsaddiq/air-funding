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
module.exports.getProjets = async (req, res) => {
    
}