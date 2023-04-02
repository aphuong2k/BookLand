const product_Model = require('../../models/admin/admin_product_Model');
const user_Model = require('./../../models/user/user_Model')
const profile_Model = require('./../../models/user/profile_Model')
const genre_Model = require('../../models/admin/admin_genre_Model');
const category_Model = require('../../models/admin/admin_category_Model');
const publish_Model = require('../../models/admin/admin_publish_Model');

var PAGE_SIZE = 6;
let getPageHome = async(req, res) => {
    let cart_quantity = 0
    if(req.user){
        let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
        let cart = await user_Model.getAllDetailItemInCart(shopping_cart_id[0].Shopping_cart_id)
        cart_quantity = cart.length
    }
    return res.render("userPage/home",{
        cart_quantity:cart_quantity,
        user:req.user,
        randomProduct: await product_Model.randomProduct(5),
        Fearture_Product: await product_Model.randomProduct(4),
        Onsale: await product_Model.randomProduct(4),
        headStart1: await product_Model.randomProduct(1),
        headStart2: await product_Model.randomProduct(1),
    })
};
let getPageShop = async(req, res) => {
    var page = req.query.page
    page = parseInt(page)
    var S = (page - 1) * PAGE_SIZE
    let product;
    let cart_quantity = 0
    if(!page){
        product = await product_Model.getproduct(PAGE_SIZE,0)
    }else{
        product = await product_Model.getproduct(PAGE_SIZE,S)
    }
    
    if(req.user){
        let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
        let cart = await user_Model.getAllDetailItemInCart(shopping_cart_id[0].Shopping_cart_id)
        cart_quantity = cart.length
    }
    try {
            let total = await product_Model.getFullproduct();
            let totalpage
            if(total.length % PAGE_SIZE == 0){
                totalpage = total.length / PAGE_SIZE
            }else{
                totalpage = (total.length - total.length % PAGE_SIZE) / PAGE_SIZE + 1
            }
            return res.render("userPage/shop",{
                page:page,
                total: totalpage,
                product: product,
                cart_quantity:cart_quantity,
                user:req.user,
                genre: await genre_Model.getFullgenre(),
                publish:await publish_Model.getFullpublish(),
                category: await category_Model.getFullcategory(),
                name:"shop",
                params:"user",
                
    })
    } catch (error) {
        console.log(error)
        return error
    }
    
};
let getPageCheckOut = async(req, res) => {
    let cart_quantity = 0
    if(req.user){
        let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
        let cart = await user_Model.getAllDetailItemInCart(shopping_cart_id[0].Shopping_cart_id)
        cart_quantity = cart.length
    }
    return res.render("userpage/check-out",{
        cart_quantity:cart_quantity,
        user:req.user,
        address_default: await profile_Model.getAddressDefault(req.user.account_id),
        address: await profile_Model.getAddress(req.user.account_id)
    })
};

let getPageContact = async(req, res) => {
    let cart_quantity = 0
    if(req.user){
        let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
        let cart = await user_Model.getAllDetailItemInCart(shopping_cart_id[0].Shopping_cart_id)
        cart_quantity = cart.length
    }
    return res.render("userpage/contact",{
        cart_quantity:cart_quantity,
        user:req.user,
    })
};
let getPageAbout = async(req, res) => {
    let cart_quantity = 0
    if(req.user){
        let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
        let cart = await user_Model.getAllDetailItemInCart(shopping_cart_id[0].Shopping_cart_id)
        cart_quantity = cart.length
    }
    return res.render("userpage/about",{
        cart_quantity:cart_quantity,
        user:req.user,
    })
};

let getDetailProduct = async(req, res) => {
    let content = await product_Model.getDetailproduct(req.params.id)
    let cart_quantity = 0
    if(req.user){
        let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
        let cart = await user_Model.getAllDetailItemInCart(shopping_cart_id[0].Shopping_cart_id)
        cart_quantity = cart.length
    }
    return res.render("userpage/detail-product",{
        cart_quantity:cart_quantity,
        user:req.user,
        detail_product: content,
        time:toJSONLocal(content[0].time_public),
        product_author: await product_Model.getDetailProductHasAuthor(req.params.id),
        randomProduct: await product_Model.randomProduct(3)
    })
};

let getPageShoppingcart = async(req, res) => {
    let cart_quantity = 0
    let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
    let cart = await user_Model.getAllDetailItemInCart(shopping_cart_id[0].Shopping_cart_id)
    cart_quantity = cart.length

    return res.render("userPage/shopping-cart",{
        cart:cart,
        cart_quantity:cart_quantity,
        user:req.user,
        errors: req.flash("errors")
    })
};
let getPageListOrder = async(req, res) => {
    let cart_quantity = 0
    let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
    let cart = await user_Model.getAllDetailItemInCart(shopping_cart_id[0].Shopping_cart_id)
    cart_quantity = cart.length

    return res.render("userPage/list-order",{
        cart:cart,
        cart_quantity:cart_quantity,
        user:req.user,
        listOrderNow:await user_Model.getPageListOrderNow(req.user.account_id),
        listOrderCancel:await user_Model.getPageListOrderCancel(req.user.account_id),
        listOrderComplete:await user_Model.getPageListOrderComplete(req.user.account_id),
        address_default: await profile_Model.getAddressDefault(req.user.account_id),
        address: await profile_Model.getAddress(req.user.account_id),
        errors: req.flash("errors"),
        success: req.flash("success")
    })
};
let createNewOrder = async(req, res) => {
    try {
    //var discount_id
    let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
    var parsed = JSON.parse(req.body.detail)
    await user_Model.createNewOrder(req.body.total,req.user.account_id,req.body.address,req.body.note,req.body.delivery,req.body.payment,req.user.email)
    let input = await user_Model.getTop1_Oder(req.user.account_id)
    parsed.forEach(async (element) => await user_Model.createOrderDetail(element.quantity,input[0].order_id,element.id,req.user.email));
    parsed.forEach(async (element) => await user_Model.UpdateQuantity(Number(element.quantity),element.id));
    parsed.forEach(async (element) => await user_Model.deleteItemShoppingCart(shopping_cart_id[0].Shopping_cart_id,element.id));

    return res.redirect('/list-order')
    } catch (error) {
        console.log(error)
        return res.redirect('/checkout')
    }
}
let checkQuantity = async(req,res) => {
    var parsed = JSON.parse(req.body.detail)
    var check = 0
    for (let i of parsed) {
        let quantity = await product_Model.getDetailproduct(i.id)
        if (Number(i.quantity) > quantity[0].quantity) {
            check += 1
            req.flash('errors','There are only ' + quantity[0].quantity + ' '+ quantity[0].product_name + ' books in stock !!')
        } 
    }
    if(check == 0){
        return res.redirect('/checkout')
    }
        return res.redirect('/shopping-cart')
    
}

let addShoppingCart = async(req, res) => {
    try {
        let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
        let checkExist = await user_Model.checklProductExistInCart(shopping_cart_id[0].Shopping_cart_id,req.body.id)
        if(checkExist.length > 0){
            let total = Number(checkExist[0].product_quantity) + Number(req.body.quantity)
            await user_Model.UpdateShoppingCart(shopping_cart_id[0].Shopping_cart_id,req.body.id,total)
        }else{
            await user_Model.addShoppingCart(shopping_cart_id[0].Shopping_cart_id,req.body.id,req.body.quantity)
        }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
        
};

let updateQuantityCart = async(req, res) => {
    try {
        let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
            await user_Model.UpdateShoppingCart(shopping_cart_id[0].Shopping_cart_id,req.body.id,req.body.quantity)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
        
};
let updateAddress = async(req,res) => {
    try {
        await user_Model.updateAddressId(req.body.address,req.params.id)
        req.flash('success','Update order successfully !')
        return res.redirect('/list-order')
    } catch (error) {
        console.log(error)
        return res.redirect('/list-order')
    }
}
let completeOrder = async(req,res) => {
    try {
        await user_Model.updateStatusOrder(req.params.id,4,req.user.email)
        req.flash('success','Complete order successfully !')
        return res.redirect('/list-order')
    } catch (error) {
        console.log(error)
        return res.redirect('/list-order')
    }
}
let cancelOrder = async(req,res) => {
    try {
        let cancelOrder  = await user_Model.orderProductDetail(req.params.id)
        for(let i of cancelOrder){
            await user_Model.UpdateProductWhenDelete(i.quantity,i.product_id)
        }
        await user_Model.updateStatusOrder(req.params.id,0,req.user.email)
        req.flash('success','Cancel order successfully !')
        return res.redirect('/list-order')
    } catch (error) {
        console.log(error)
        return res.redirect('/list-order')
    }
}

let deleteProduct = async(req, res) => {
    try {
        let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
            await user_Model.deleteItemShoppingCart(shopping_cart_id[0].Shopping_cart_id,req.params.id)
            return res.redirect('/shopping-cart')
        } catch (error) {
            console.log(error)
            return false
        }
        
};
let getDetailOrder = async(req, res) => {
    let cart_quantity = 0
    let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
    let cart = await user_Model.getAllDetailItemInCart(shopping_cart_id[0].Shopping_cart_id)
    cart_quantity = cart.length

    return res.render("userPage/order-detail",{
        cart:cart,
        cart_quantity:cart_quantity,
        user:req.user,
        orderDetail: await user_Model.orderDetail(req.params.id),
        orderProductDetail : await user_Model.orderProductDetail(req.params.id),
        errors: req.flash("errors"),
        success: req.flash("success"),
    })
        
};
let SearchProduct = async(req, res) => {
    try {
    let cart_quantity = 0
    if(req.user){
        let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
        let cart = await user_Model.getAllDetailItemInCart(shopping_cart_id[0].Shopping_cart_id)
        cart_quantity = cart.length
    }
        return res.render("userpage/shop", {
            product: await user_Model.SearchProduct(req.query.year,req.query.genre,req.query.publish),
            cart_quantity:cart_quantity,
            user:req.user,
            genre: await genre_Model.getFullgenre(),
            publish:await publish_Model.getFullpublish(),
            category: await category_Model.getFullcategory(),
        });
    } catch (error) {
        console.log(error)
        return res.render("userpage/shop")
    }
};
let SearchByCategory = async(req, res) => {
    try {
    let cart_quantity = 0
    if(req.user){
        let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
        let cart = await user_Model.getAllDetailItemInCart(shopping_cart_id[0].Shopping_cart_id)
        cart_quantity = cart.length
    }
        return res.render("userpage/shop", {
            product: await user_Model.getproductCategory(req.params.id),
            genre: await user_Model.getGenreFromCategory(req.params.id),
            cart_quantity:cart_quantity,
            user:req.user,
            publish:await publish_Model.getFullpublish(),
            category: await category_Model.getFullcategory(),
        });
    } catch (error) {
        console.log(error)
        return res.render("userpage/shop")
    }
};
let SearchProductHead = async(req, res) => {
    try {
    let cart_quantity = 0
    if(req.user){
        let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
        let cart = await user_Model.getAllDetailItemInCart(shopping_cart_id[0].Shopping_cart_id)
        cart_quantity = cart.length
    }
        return res.render("userpage/shop", {
            product: await user_Model.SearchProductHead(req.query.key),
            cart_quantity:cart_quantity,
            user:req.user,
            genre: await genre_Model.getFullgenre(),
            publish:await publish_Model.getFullpublish(),
            category: await category_Model.getFullcategory(),
        });
    } catch (error) {
        console.log(error)
        return res.render("userpage/shop")
    }
};

function toJSONLocal(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }
module.exports = {
    getPageHome:getPageHome,
    addShoppingCart:addShoppingCart,
    getPageShop:getPageShop,
    getPageShoppingcart:getPageShoppingcart,
    updateQuantityCart:updateQuantityCart,
    deleteProduct:deleteProduct,
    getDetailProduct:getDetailProduct,
    getPageCheckOut:getPageCheckOut,
    createNewOrder:createNewOrder,
    checkQuantity:checkQuantity,
    getPageListOrder:getPageListOrder,
    cancelOrder:cancelOrder,
    updateAddress:updateAddress,
    getDetailOrder:getDetailOrder,
    completeOrder:completeOrder,
    SearchProduct:SearchProduct,
    SearchProductHead:SearchProductHead,
    SearchByCategory:SearchByCategory,
    getPageContact:getPageContact,
    getPageAbout:getPageAbout
} ;