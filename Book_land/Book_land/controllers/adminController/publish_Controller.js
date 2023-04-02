const publish_Model = require('../../models/admin/admin_publish_Model');

var PAGE_SIZE = 4;
let getPagepublish = async(req, res) => {
        var page = req.query.page
        page = parseInt(page)
        var S = (page - 1) * PAGE_SIZE
        let publishDelete = await publish_Model.getDeletepublish()
        let publish; 
     
        if(!page){
            publish = await publish_Model.getpublish(PAGE_SIZE,0)
        }else{
            publish = await publish_Model.getpublish(PAGE_SIZE,S)
        }  
        try {
            let total = await publish_Model.getFullpublish();
            let totalpage
            if(total.length % PAGE_SIZE == 0){
                totalpage = total.length / PAGE_SIZE
            }else{
                totalpage = (total.length - total.length % PAGE_SIZE) / PAGE_SIZE + 1
            }
            return res.render("adminpage/publish", {
                check:req.user,
                page:page,
                total: totalpage,
                publish: publish,
                name:"publish",
                user:"admin",
                totalDelete: publishDelete.length,
                delete: publishDelete,
                errors: req.flash("errors"),
                success: req.flash("success"),
                layout:'admin'
            });
        } catch (error) {
            console.log(error)
            return error
        }
    
};
let createNewpublish = async(req, res) => {
    try {
        await publish_Model.createNewpublish(req.user.email,req.body.name)
        return res.redirect('/admin/publish')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/publish')
    }
    
};
let updatepublish = async(req, res) => {
    try {
        await publish_Model.updatepublish(req.body.name,req.user.email,req.body.id)
        return res.redirect('/admin/publish')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/publish')
    }
    
};
let deletepublish = async(req, res) => {
    try {
        await publish_Model.deletepublish(req.params.id_ad,req.user.email)
        return res.redirect('/admin/publish')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/publish')
    }
};
let backpublish = async(req, res) => {
    try {
        await publish_Model.getpublishBack(req.params.id_ad,req.user.email)
        return res.redirect('/admin/publish')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/publish')
    }
};
let searchpublish = async(req, res) => {
    try {
        let publishDelete = await publish_Model.getDeletepublish()
        let publish = await publish_Model.Searchpublish(req.query.name)
        return res.render("adminpage/publish", {
            check:req.user,
            totalDelete: publishDelete.length,
            delete: publishDelete,
            publish: publish,
            layout:'admin'
        });
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/publish')
    }
};
module.exports = {
    getPagepublish:getPagepublish,
    createNewpublish:createNewpublish,
    updatepublish:updatepublish,
    deletepublish:deletepublish,
    searchpublish:searchpublish,
    backpublish:backpublish
}