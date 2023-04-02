const express = require('express');
let route = express.Router();
const auth_userController = require('../../controllers/userController/auth_userController');
const account_Controller = require('../../controllers/adminController/account_Controller');

// let HomeRoutes = (app) => {
    
    route.get("/account/search",account_Controller.searchaccount);
    route.get("/account/detail/:id",account_Controller.getdetailaccount);
    route.post("/account/back/:id",account_Controller.backaccount)
    route.post("/account/delete/:id",account_Controller.deleteaccount)
    route.post("/account/update/:id",account_Controller.updateaccount);
    route.get("/account",auth_userController.checkAdmin,account_Controller.getPageaccount);
    // return app.use("/", route);
    // };
    // module.exports = HomeRoutes;
    module.exports = route
