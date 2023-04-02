const account_Model = require('../../models/admin/admin_account_Model');
const auth_userModel = require('./../../models/user/auth_userModel')
var PAGE_SIZE = 1;
let getPageaccount = async(req, res) => {
        var page = req.query.page
        page = parseInt(page)
        var S = (page - 1) * PAGE_SIZE
        let accountDelete = await account_Model.getDeleteaccount()
        let account; 
     
        if(!page){
            account = await account_Model.getaccount(PAGE_SIZE,0)
        }else{
            account = await account_Model.getaccount(PAGE_SIZE,S)
        }  
        try {
            let total = await account_Model.getFullaccount();
            let totalpage
            if(total.length % PAGE_SIZE == 0){
                totalpage = total.length / PAGE_SIZE
            }else{
                totalpage = (total.length - total.length % PAGE_SIZE) / PAGE_SIZE + 1
            }
            return res.render("adminpage/account", {
                page:page,
                total: totalpage,
                account: account,
                name:"account",
                user:"admin",
                check:req.user,
                totalDelete: accountDelete.length,
                delete: accountDelete,
                errors: req.flash("errors"),
                success: req.flash("success"),
                layout:'admin'
            });
        } catch (error) {
            console.log(error)
            return error
        }  
};

let getdetailaccount = async(req, res) => {
    return res.render("adminpage/account_detail",{
        check:req.user,
        account: await account_Model.findUserById(req.params.id),
        order: await account_Model.getPageListOrder(req.params.id),
        layout:'admin'
    })
        
};
let updateaccount = async(req, res) => {
    try {
        await account_Model.updateaccount(req.body.role,req.user.email,req.params.id)
        req.flash("success","Change Account'role successfully !")
        res.redirect(req.get('referer'));
    } catch (error) {
        console.log(error)
        res.redirect(req.get('referer'));
    }
    
};
let deleteaccount = async(req, res) => {
    try {
        await account_Model.deleteaccount(req.params.id,req.user.email)
        req.flash("success","Disable Account successfully !")
        res.redirect(req.get('referer'));
    } catch (error) {
        console.log(error)
        res.redirect(req.get('referer'));
    }
};
let backaccount = async(req, res) => {
    try {
        await account_Model.getaccountBack(req.params.id,req.user.email)
        req.flash("success","Get Account back successfully !")
        return res.redirect('/admin/account')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/account')
    }
};
let searchaccount = async(req, res) => {
    try {
        let accountDelete = await account_Model.getDeleteaccount()
        let account = await account_Model.Searchaccount(req.query.iduser)
        return res.render("adminpage/account", {
            check:req.user,
            totalDelete: accountDelete.length,
            delete: accountDelete,
            account: account,
            layout:'admin'
        });
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/account')
    }
};
module.exports = {
    getPageaccount:getPageaccount,
    updateaccount:updateaccount,
    deleteaccount:deleteaccount,
    searchaccount:searchaccount,
    backaccount:backaccount,
    getdetailaccount:getdetailaccount
}