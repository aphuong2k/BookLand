const {check} = require('express-validator');
let validateRegister = [
    check("email", "Invalid email").isEmail().trim(),
    check("name", "Invalid username. username must be at 8 to 15 chars long and is Alphanumeric")
    .isLength({ min: 8,max:20 }).isAlphanumeric(),
    check("password", "Invalid password. Password must be at least 6 chars long")
    .isLength({ min: 6 }),
    check("phone", "Invalid numberphone. Password must be number")
    .isLength({min:10,max:11}).isInt(),
    check("passwordConfirmation", "Password confirmation does not match password")
    .custom((value, { req }) => {
        return value === req.body.password
    }),
   

];

let validateLogin = [
    check("email", "Invalid email").isEmail().trim(),

    check("password", "Invalid password")
    .not().isEmpty()
];
let validateChangePW = [
    check("password", "Invalid password. Password must be at least 6 chars long")
    .isLength({ min: 6 }),
    check("passwordConfirmation", "Password confirmation does not match password")
    .custom((value, { req }) => {
        return value === req.body.password
    }),
    check("password", "New Password can't same old password")
    .custom((value, { req }) => {
        return value !== req.body.Oldpassword
    }),
];
let validateReNewPW = [
    check("password", "Invalid password. Password must be at least 6 chars long")
    .isLength({ min: 6 }),
    check("passwordConfirmation", "Password confirmation does not match password")
    .custom((value, { req }) => {
        return value === req.body.password
    }),
];
let validateChangeInfor = [
    check("name", "Invalid username. username must be at 8 to 15 chars long and is Alphanumeric")
    .isLength({ min: 8,max:20 }).isAlphanumeric(),
    check("phone", "Invalid numberphone. Password must be number")
    .isLength({min:10,max:11}).isInt(),
];
module.exports = {
    validateRegister: validateRegister,
    validateLogin: validateLogin,
    validateChangePW:validateChangePW,
    validateReNewPW:validateReNewPW,
    validateChangeInfor:validateChangeInfor
};