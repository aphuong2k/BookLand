const category_Model = require('../../models/admin/admin_category_Model');

var PAGE_SIZE = 4;
let getPagecategory = async(req, res) => {
        var page = req.query.page
        page = parseInt(page)
        var S = (page - 1) * PAGE_SIZE
        let categoryDelete = await category_Model.getDeletecategory()
        let category; 
     
        if(!page){
            category = await category_Model.getcategory(PAGE_SIZE,0)
        }else{
            category = await category_Model.getcategory(PAGE_SIZE,S)
        }  
        try {
            let total = await category_Model.getFullcategory();
            let totalpage
            if(total.length % PAGE_SIZE == 0){
                totalpage = total.length / PAGE_SIZE
            }else{
                totalpage = (total.length - total.length % PAGE_SIZE) / PAGE_SIZE + 1
            }
            return res.render("adminpage/category", {
                check:req.user,
                page:page,
                total:totalpage,
                category: category,
                name:"category",
                user:"admin",
                totalDelete: categoryDelete.length,
                delete: categoryDelete,
                errors: req.flash("errors"),
                success: req.flash("success"),
                layout:'admin'
            });
        } catch (error) {
            console.log(error)
            return error
        }
    
};
let createNewcategory = async(req, res) => {
    try {
        await category_Model.createNewcategory(req.user.email,req.body.name)
        return res.redirect('/admin/category')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/category')
    }
    
};
let updatecategory = async(req, res) => {
    try {
        await category_Model.updatecategory(req.body.name,req.user.email,req.body.id)
        return res.redirect('/admin/category')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/category')
    }
    
};
let deletecategory = async(req, res) => {
    try {
        await category_Model.deletecategory(req.params.id_ad,req.user.email)
        return res.redirect('/admin/category')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/category')
    }
};
let backcategory = async(req, res) => {
    try {
        await category_Model.getcategoryBack(req.params.id_ad,req.user.email)
        return res.redirect('/admin/category')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/category')
    }
};
let searchcategory = async(req, res) => {
    try {
        let total = await category_Model.getFullcategory();
        let category = await category_Model.Searchcategory(req.query.name)
        return res.render("adminpage/category", {
            check:req.user,
            totalDelete: categoryDelete.length,
            delete: categoryDelete,
            category: category,
            layout:'admin'
        });
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/category')
    }
};
module.exports = {
    getPagecategory:getPagecategory,
    createNewcategory:createNewcategory,
    updatecategory:updatecategory,
    deletecategory:deletecategory,
    searchcategory:searchcategory,
    backcategory:backcategory
}