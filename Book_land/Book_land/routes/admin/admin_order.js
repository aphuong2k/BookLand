const express = require('express');
let route = express.Router();
const order_Controller = require('../../controllers/adminController/order_controller');

// let HomeRoutes = (app) => {
    // route.get("/list-input-order/search",order_Controller.searchOrderInput);
    // route.get("/list-input-order/:id",order_Controller.getPageDetailInputOrder);
    // route.get("/list-input-order",order_Controller.getPageListInputOrder);
    // route.get("/input-order/:id",order_Controller.getDetailproduct);
    route.get("/list-order/search",order_Controller.searchOrder);
    route.get("/order/:id",order_Controller.getDetailOrder);
    route.post("/order/change/:id",order_Controller.changeStatusOrder);
    route.get("/order",order_Controller.getPageListOrder);
    // return app.use("/", route);
    // };
    // module.exports = HomeRoutes;
    module.exports = route
