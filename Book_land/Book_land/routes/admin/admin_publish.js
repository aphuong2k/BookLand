const express = require('express');
let route = express.Router();
const publish_Controller = require('../../controllers/adminController/publish_Controller');

// let HomeRoutes = (app) => {
    route.get("/publish/search",publish_Controller.searchpublish);
    route.post("/publish/back/:id_ad",publish_Controller.backpublish)
    route.post("/publish/delete/:id_ad",publish_Controller.deletepublish)
    route.post("/publish/update",publish_Controller.updatepublish);
    route.post("/publish",publish_Controller.createNewpublish);
    route.get("/publish",publish_Controller.getPagepublish);
    // return app.use("/", route);
    // };
    // module.exports = HomeRoutes;
    module.exports = route
