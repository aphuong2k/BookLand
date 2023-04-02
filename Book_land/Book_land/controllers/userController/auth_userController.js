const auth_userModel = require('./../../models/user/auth_userModel')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt');
require('dotenv/config');
const sendMail = require('../../middlewares/sendmail');

// get page đăng kí
let getPageRegister = (req, res) => {
    return res.render("userPage/registration", {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};
// get page đăng nhập
let getPageLogin = (req, res) => {
    return res.render("userPage/login", {
        errors: req.flash("errors"),
        success: req.flash("success")
    });
};
   
// tạo tk mới
let createNewUser = async (req, res) => {
    //validate required fields
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/auth/register");
    }

    //create a new user
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        genre: 'nor'
    };
    try {
        let check = await auth_userModel.findUserByEmail(newUser.email);
        if(check){
            throw "This email "+ newUser.email +" has already exist. Please choose an other email";
        }else{
            await auth_userModel.createNewUser(newUser);

            bcrypt.hash(newUser.email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
                console.log(`${process.env.APP_URL}/auth/verify?email=${newUser.email}&token=${hashedEmail}`);
                sendMail(newUser.email, "Verify Email", `<a href="${process.env.APP_URL}/auth/verify?email=${newUser.email}&token=${hashedEmail}"> Verify </a>`)
            });
            await auth_userModel.createNewUserShoppingCart(newUser.email);
            req.flash("success",`You have successfully created an account !! Please check your email to verify account !`);
            return res.redirect("/auth/login");
        }
    
    } catch (err) {
        req.flash("errors", err.toString());
        return res.redirect("/auth/register");
    }
};
let verify = async(req,res) => {
    try {
        await auth_userModel.verify(req.query.email, req.query.token);
        await auth_userModel.updateUserVerify(req.query.email)
        req.flash("success", "You have successfully verified your account !");
        return res.redirect('/auth/login')
    } catch (err) {
       console.log(err)
    }
};


// let handleLogin = async (req, res) => {
//     let errorsArr = [];
//     let validationErrors = validationResult(req);
//     if (!validationErrors.isEmpty()) {
//         let errors = Object.values(validationErrors.mapped());
//         errors.forEach((item) => {
//             errorsArr.push(item.msg);
//         });
//         req.flash("errors", errorsArr);
//         console.log(validationErrors);
//         return res.redirect("/auth/login");
//     }

//     try {
//         await auth_userModel.handleLogin(req.body.email, req.body.password);
//         return res.redirect("/");
//     } catch (err) {
//         req.flash("errors", err);
//         return res.redirect("/auth/login");
//     }
// };
let checkAdmin = (req,res,next)=>{
    if(req.user.role == '1'){
        return res.redirect('/')
    }
    next()
}

    let checkLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/auth/login");
    }
    next();
};

    let checkLoggedOut = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
};

    let postLogOut = (req, res) => {
    req.session.destroy(function(err) {
        return res.redirect("/auth/login");
    });
};
module.exports = {
    getPageRegister: getPageRegister,
    createNewUser: createNewUser,
    getPageLogin: getPageLogin,
    // handleLogin: handleLogin,
    checkLoggedIn: checkLoggedIn,
    checkLoggedOut: checkLoggedOut,
    postLogOut: postLogOut,
    verify:verify,
    checkAdmin:checkAdmin
};