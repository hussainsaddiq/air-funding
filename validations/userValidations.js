const {body} = require("express-validator")
module.exports.registerValidations = [body('name').not().isEmpty().escape().trim().withMessage('name is required'),
                   body('email').not().isEmpty().trim().escape().withMessage('email is required'),
                   body('password').isLength({min: 5}).withMessage('password is required'),
                   body('confirmPassword').custom((value, {req}) => {
                       if(value !== req.body.password) {
                        throw new Error('Password confirmation does not match password');
                       } else {
                           return true;
                       }
                   }),
]
module.exports.loginValidations = [
    body('email').not().isEmpty().trim().escape().withMessage('email is required'),
    body('password').not().isEmpty().withMessage('password is required'),
]
module.exports.passwordValidations = [
    body('password').not().isEmpty().withMessage('current password is required'),
    body('newPassword').isLength({min: 5}).withMessage('new password should be 5 characters long'),
]