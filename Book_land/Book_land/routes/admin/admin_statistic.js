const express = require('express');
let route = express.Router();
const statistic_Controller = require('../../controllers/adminController/statistic_Controller');

// let HomeRoutes = (app) => {
    route.get("/statistic/:id",statistic_Controller.statisticFormonth);
    route.get("/statistic",statistic_Controller.statistic);
    // return app.use("/", route);
    // };
    // module.exports = HomeRoutes;
    module.exports = route