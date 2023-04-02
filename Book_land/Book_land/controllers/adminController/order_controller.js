const order_Model = require('../../models/admin/admin_order_model');
const user_Model = require('./../../models/user/user_Model')


var PAGE_SIZE = 4;
let getPageListOrder = async(req, res) => {
    var page = req.query.page
        page = parseInt(page)
        var S = (page - 1) * PAGE_SIZE
        let order;
        if(!page){
            order = await order_Model.getPageListOrder(PAGE_SIZE,0)
        }else{
            order = await order_Model.getPageListOrder(PAGE_SIZE,S)
        } 
        let total = await order_Model.getlengPageListOrder(); 
        let totalpage
            if(total.length % PAGE_SIZE == 0){
                totalpage = total.length / PAGE_SIZE
            }else{
                totalpage = (total.length - total.length % PAGE_SIZE) / PAGE_SIZE + 1
            }
    return res.render("adminpage/list-order",{
        page:page,
        check:req.user,
        total: totalpage,
        order: order,
        name:"order",
        user:"admin",
        errors: req.flash("errors"),
        success: req.flash("success"),
        layout:'admin'
    })
};
let changeStatusOrder = async(req,res) => {
    try {
        if(Number(req.body.status) == 0){
            let cancelOrder  = await user_Model.orderProductDetail(req.params.id)
            for(let i of cancelOrder){
            await user_Model.UpdateProductWhenDelete(i.quantity,i.product_id)
        }
        }
        await user_Model.updateStatusOrder(req.params.id,Number(req.body.status),req.user.email)
        req.flash('success','Change status successfully !')
        res.redirect(req.get('referer'));
    } catch (error) {
        console.log(error)
        res.redirect(req.get('referer'));
    }
}
let getDetailOrder = async(req, res) => {
    return res.render("adminpage/order_detail",{
        check:req.user,
        order: await order_Model.SearchOrder(req.params.id),
        orderDetail: await user_Model.orderDetail(req.params.id),
        orderProductDetail : await user_Model.orderProductDetail(req.params.id),
        layout:'admin'
    })
        
};
let searchOrder = async(req, res) => {
    try {
        let order = await order_Model.SearchOrder(req.query.idorder)
        return res.render("adminpage/list-order", {
            check:req.user,
            order: order,
            layout:'admin'
        });
    } catch (error) {
        console.log(error)
        return res.redirect('adminpage/list-order')
    }
};

module.exports = {
    getPageListOrder:getPageListOrder,
    changeStatusOrder:changeStatusOrder,
    getDetailOrder:getDetailOrder,
    searchOrder:searchOrder
}