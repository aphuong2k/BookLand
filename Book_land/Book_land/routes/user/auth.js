const express = require('express');
const auth_userController = require('../../controllers/userController/auth_userController');
let route = express.Router();
const passport = require('passport');
const auth = require('../../validation/authValidation');
const passportLocal = require('../../controllers/userController/passportController');
const reset_password = require('../../controllers/userController/reset_password');
const auth_google = require('../../controllers/userController/auth_google');

    passportLocal();
    auth_google();
    // let UserRoutes = (app) => {
    route.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))
    route.get('/google/callback', passport.authenticate('google', { 
        successRedirect: "/",
        failureRedirect: "/auth/login",
        successFlash: true,
        failureFlash: true
    }));      
    route.get("/login",auth_userController.checkLoggedOut, auth_userController.getPageLogin);
    route.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth/login",
        successFlash: true,
        failureFlash: true
    }));
    route.get("/register",auth_userController.checkLoggedOut,auth_userController.getPageRegister);
    route.post("/register", auth.validateRegister, auth_userController.createNewUser);
    route.get('/verify',auth_userController.verify);
    route.post("/logout", auth_userController.postLogOut);
    route.post('/check-email', reset_password.sendResetLinkEmail);
    route.get('/password-reset/:email', reset_password.getPageResetPw);
    route.post('/password-reset',auth.validateReNewPW,reset_password.resetPw);
    // return app.use("/auth", route);
    // };
    // module.exports = UserRoutes;
    module.exports = route;