const express = require('express');
let route = express.Router();
const input_order_Controller = require('../../controllers/adminController/input_order_Controller');

// let HomeRoutes = (app) => {
    route.get("/list-input-order/search",input_order_Controller.searchOrderInput);
    route.get("/list-input-order/:id",input_order_Controller.getPageDetailInputOrder);
    route.get("/list-input-order",input_order_Controller.getPageListInputOrder);
    route.get("/input-order/:id",input_order_Controller.getDetailproduct);
    route.post("/input-order",input_order_Controller.createNewOrder);
    route.get("/input-order",input_order_Controller.getOrderInputPage);
    // return app.use("/", route);
    // };
    // module.exports = HomeRoutes;
    module.exports = route
