const express = require("express");
const { profile,updatePasswordPage, postPassword  } = require("../controllers/profileController");
const {changePictureView, profileImagePost} = require("../controllers/imageController")
const { register, createUser, logout, login, loginUser } = require("../controllers/userController");
const { userAuth, publicAuth } = require("../utils/userAuth");
const {registerValidations, loginValidations,passwordValidations } = require("../validations/userValidations");
const { create } = require("../controllers/Project");
const router = express.Router();

router.get('/register', publicAuth, register)
router.post('/createUser', registerValidations, createUser)
router.get('/login', login)
router.post('/loginUser', loginValidations, loginUser);

router.get('/profile', userAuth, profile);
router.get('/change-picture', userAuth, changePictureView);
router.post('/change-picture-post', userAuth, profileImagePost);
router.get('/change_password', userAuth, updatePasswordPage)
router.post('/post_password', [userAuth, passwordValidations], postPassword);
router.get('/create', userAuth, create);
router.get('/logout', logout)
module.exports = router;