const express = require('express');
let route = express.Router();
const product_Controller = require('../../controllers/adminController/product_Controller');

// let HomeRoutes = (app) => {
    route.get("/product/detail/:id",product_Controller.getAllDetailProduct);
    route.get("/product/search",product_Controller.searchproduct);
    route.get("/product/:id_ad",product_Controller.getDetailProduct)
    route.post("/product/back/:id_ad",product_Controller.backProduct)
    route.post("/product/delete/:id_ad",product_Controller.deleteproduct)
    route.post("/product/update",product_Controller.updateproduct);
    route.post("/product",product_Controller.createNewproduct);
    route.get("/product",product_Controller.getPageproduct);
    // return app.use("/", route);
    // };
    // module.exports = HomeRoutes;
    module.exports = route
