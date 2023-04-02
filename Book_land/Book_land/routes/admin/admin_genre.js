const express = require('express');
let route = express.Router();
const genre_Controller = require('../../controllers/adminController/genre_Controller');

// let HomeRoutes = (app) => {
    route.get("/genre/search",genre_Controller.searchgenre);
    route.post("/genre/back/:id_ad",genre_Controller.backGenre)
    route.post("/genre/delete/:id_ad",genre_Controller.deletegenre)
    route.post("/genre/update",genre_Controller.updategenre);
    route.post("/genre",genre_Controller.createNewgenre);
    route.get("/genre",genre_Controller.getPagegenre);
    // return app.use("/", route);
    // };
    // module.exports = HomeRoutes;
    module.exports = route
