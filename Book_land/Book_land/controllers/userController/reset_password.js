const auth_userModel = require('./../../models/user/auth_userModel')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt');
require('dotenv/config');
const sendMail = require('../../middlewares/sendmail');

let getPageResetPw = (req, res) => {
    if (!req.params.email || !req.query.token) {
        return res.redirect('/auth/login')
    } else {
        return res.render('userPage/resetpw', { email: req.params.email, token: req.query.token })
    }
};
let sendResetLinkEmail = async(req,res) =>{
    try {
        if (!req.body.email) {
            console.log('fail')
            res.redirect('/auth/login')
        } else {
            let check = await auth_userModel.findUserByEmail(req.body.email);
            if(!check){
                throw "This email "+ req.body.email +" hasn't already exist. Please choose an other email";
            }else{

                bcrypt.hash(req.body.email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
                    sendMail(req.body.email, "Reset password", `<a href="${process.env.APP_URL}/auth/password-reset/${req.body.email}?token=${hashedEmail}"> Reset Password </a>`)
                    console.log(`${process.env.APP_URL}/auth/password-reset/${req.body.email}?token=${hashedEmail}`);
                })
                req.flash("success",`Please check your email to reset your password !`);
                console.log('ok')
                return res.redirect("/auth/login");
            }
        }
    } catch (error) {
        req.flash("errors",error)
        console.log(error)
        return res.redirect('/auth/login')
    }
}
let resetPw = async(req,res) => {
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/auth/login");
    }

    try {
        if (!req.body.email.toString() || !req.body.token.toString() || !req.body.password.toString()) { 
            res.redirect('/auth/login');
        }else{
            await auth_userModel.verify(req.body.email,req.body.token);
            await auth_userModel.updatePassword(req.body.password,req.body.email)
            req.flash("success",`You have successfully reset your password!`);
            return res.redirect('/auth/login')
        }
    } catch (error) {
        console.log(error)
        return res.redirect('/auth/login')
    }
}


module.exports = {
    getPageResetPw:getPageResetPw,
    sendResetLinkEmail:sendResetLinkEmail,
    resetPw:resetPw
} ;