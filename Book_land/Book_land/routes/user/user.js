const express = require('express');
let route = express.Router();
const homeController = require('../../controllers/userController/homeController');
const auth_userController = require('../../controllers/userController/auth_userController');

    route.get("/about",homeController.getPageAbout)
    route.get("/contact",homeController.getPageContact)
    route.get("/category/:id",homeController.SearchByCategory)
    route.get("/product/search",homeController.SearchProductHead)
    route.get("/user/shop/search",homeController.SearchProduct)
    route.post("/list-order/complete/:id",homeController.completeOrder)
    route.post("/list-order/cancel/:id",homeController.cancelOrder)
    route.post("/list-order/update/:id",homeController.updateAddress)
    route.get("/list-order/:id",homeController.getDetailOrder)
    route.get("/list-order",homeController.getPageListOrder)
    route.post("/check",homeController.checkQuantity)
    route.post("/checkout",homeController.createNewOrder)
    route.post("/shopping-cart/delete/:id",homeController.deleteProduct)
    route.get("/checkout",homeController.getPageCheckOut);
    route.get("/shop/product/:id",homeController.getDetailProduct);
    route.get("/shopping-cart",auth_userController.checkLoggedIn,homeController.getPageShoppingcart);
    route.get("/user/shop",homeController.getPageShop);
    route.post("/update-quantity",homeController.updateQuantityCart);
    route.post("/add-shopping-cart",homeController.addShoppingCart);
    route.get("/",homeController.getPageHome);
    // return app.use("/", route);
    // };
    // module.exports = HomeRoutes;
    module.exports = route
