const express = require('express');
let route = express.Router();
const category_Controller = require('../../controllers/adminController/category_Controller');

// let HomeRoutes = (app) => {
    route.get("/category/search",category_Controller.searchcategory);
    route.post("/category/back/:id_ad",category_Controller.backcategory)
    route.post("/category/delete/:id_ad",category_Controller.deletecategory)
    route.post("/category/update",category_Controller.updatecategory);
    route.post("/category",category_Controller.createNewcategory);
    route.get("/category",category_Controller.getPagecategory);
    // return app.use("/", route);
    // };
    // module.exports = HomeRoutes;
    module.exports = route
