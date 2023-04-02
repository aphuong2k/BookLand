const express = require('express');
let route = express.Router();
const profileController = require('../../controllers/userController/profileController');
const auth_userController = require('../../controllers/userController/auth_userController');
const auth = require('../../validation/authValidation');

// let ProfileRoutes = (app) => {
//     route.get("/",profileController.getPageProfile);
//     return app.use("/profile", route);
//     };
//     module.exports = ProfileRoutes;
route.post("/address-book/delete/:id_ad",profileController.deleteAddress)
route.post("/address-book/update",profileController.updateAddress)
route.post("/address-book/:id_ad",profileController.updateAddressDefault)
route.get("/address-book/:id_ad",auth_userController.checkLoggedIn,profileController.getAddress)
route.post("/address-book",profileController.createAddress);
route.get("/change-password",auth_userController.checkLoggedIn,profileController.getPageChangePw);
route.post("/change-password",auth.validateChangePW,profileController.changeAndcreatePW);
route.post("/upload-image",profileController.updateImage);
route.get("/address-book",auth_userController.checkLoggedIn,profileController.getPageAddressBook)
route.post("/",auth.validateChangeInfor,profileController.changeProfileDetail);
route.get("/",auth_userController.checkLoggedIn,profileController.getPageProfile);
module.exports = route
