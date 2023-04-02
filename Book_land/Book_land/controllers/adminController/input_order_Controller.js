const product_Model = require('../../models/admin/admin_product_Model');
const input_order_Model = require('../../models/admin/admin_input_order_Model');

var PAGE_SIZE = 4;
let getPageListInputOrder = async(req, res) => {
        var page = req.query.page
        page = parseInt(page)
        var S = (page - 1) * PAGE_SIZE
        let input_order; 
     
        if(!page){
            input_order = await input_order_Model.getAllInputOrder(PAGE_SIZE,0)
        }else{
            input_order = await input_order_Model.getAllInputOrder(PAGE_SIZE,S)
        }  
        try {
            let total = await input_order_Model.getTotalInputOrder();
            let totalpage
            if(total.length % PAGE_SIZE == 0){
                totalpage = total.length / PAGE_SIZE
            }else{
                totalpage = (total.length - total.length % PAGE_SIZE) / PAGE_SIZE + 1
            }
            return res.render("adminpage/list_order_input", {
                page:page,
                check:req.user,
                total: totalpage,
                input_order: input_order,
                user:"admin",
                name:"list-input-order",
                errors: req.flash("errors"),
                success: req.flash("success"),
                layout:'admin'
            });
        } catch (error) {
            console.log(error)
            return error
        }
    
};
let getPageDetailInputOrder = async(req, res) => { 
    try {
        let detail_input_order = await input_order_Model.getDetailInputOrder(req.params.id);
        let input_order = await input_order_Model.selectInputOrder(req.params.id);
        return res.render("adminpage/detail_order_input", {
            check:req.user,
            input_order: input_order,
            detail_input_order:detail_input_order,
            layout:'admin'
        });
    } catch (error) {
        console.log(error)
        return error
    }

};

let getOrderInputPage = async(req, res) => {
    let product = await product_Model.getFullproduct()
    return res.render("adminpage/order_input",{
        check:req.user,
        product:product,
        layout:'admin'
    })
};
let getDetailproduct = async(req, res) => {
    try {
    let a = await product_Model.getDetailproduct(req.params.id)
    return res.json(a)
    } catch (error) {
        console.log(error)
        return error
    } 
};
let createNewOrder = async(req, res) => {
    try {
    var parsed = JSON.parse(req.body.detail_input)
    await input_order_Model.createNewOrderInput(req.body.total,req.body.note,req.user.email)
    let input = await input_order_Model.getTop1_OderInput()
    parsed.forEach(async (element) => await input_order_Model.createOrderInputDetail(element.quantity,input[0].id_order_input,element.id,req.user.email));
    parsed.forEach(async (element) => await product_Model.UpdateQuantity(element.total,element.id));
    return res.redirect('/admin/list-input-order')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/list-input-order')
    }
}
let searchOrderInput = async(req, res) => {
    try {
        let input_order = await input_order_Model.searchInputOrder(req.query.idorder)
        return res.render("adminpage/list_order_input", {
            check:req.user,
            input_order: input_order,
            layout:'admin'
        });
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/list-order-input')
    }
};
module.exports = {
    getOrderInputPage:getOrderInputPage,
    getDetailproduct:getDetailproduct,
    createNewOrder:createNewOrder,
    getPageListInputOrder:getPageListInputOrder,
    getPageDetailInputOrder:getPageDetailInputOrder,
    searchOrderInput:searchOrderInput
}