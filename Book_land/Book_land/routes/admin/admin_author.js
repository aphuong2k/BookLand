const express = require('express');
let route = express.Router();
const author_Controller = require('../../controllers/adminController/author_Controller');

// let HomeRoutes = (app) => {
    route.get("/author/search",author_Controller.searchauthor);
    route.post("/author/back/:id_ad",author_Controller.backauthor)
    route.post("/author/delete/:id_ad",author_Controller.deleteauthor)
    route.post("/author/update",author_Controller.updateauthor);
    route.post("/author",author_Controller.createNewauthor);
    route.get("/author",author_Controller.getPageauthor);
    // return app.use("/", route);
    // };
    // module.exports = HomeRoutes;
    module.exports = route
