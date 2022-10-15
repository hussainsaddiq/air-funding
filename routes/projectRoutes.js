const {Router} = require("express");
const { createProject, projects, getProject } = require("../controllers/Project");
const router = Router();
router.post('/create-project', createProject);
router.get('/projects', projects);
router.get('/project/:id', getProject);
module.exports = router;