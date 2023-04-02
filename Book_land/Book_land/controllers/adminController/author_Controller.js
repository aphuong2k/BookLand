const author_Model = require('../../models/admin/admin_author_Model');

var PAGE_SIZE = 4;
let getPageauthor = async(req, res) => {
        var page = req.query.page
        page = parseInt(page)
        var S = (page - 1) * PAGE_SIZE
        let authorDelete = await author_Model.getDeleteAuthor()
        let author; 
     
        if(!page){
            author = await author_Model.getAuthor(PAGE_SIZE,0)
        }else{
            author = await author_Model.getAuthor(PAGE_SIZE,S)
        }  
        try {
            let total = await author_Model.getFullAuthor();
            let totalpage
            if(total.length % PAGE_SIZE == 0){
                totalpage = total.length / PAGE_SIZE
            }else{
                totalpage = (total.length - total.length % PAGE_SIZE) / PAGE_SIZE + 1
            }
            return res.render("adminpage/author", {
                page:page,
                total: totalpage,
                author: author,
                name:"author",
                user:"admin",
                check:req.user,
                totalDelete: authorDelete.length,
                delete: authorDelete,
                errors: req.flash("errors"),
                success: req.flash("success"),
                layout:'admin'
            });
        } catch (error) {
            console.log(error)
            return error
        }
    
};
let createNewauthor = async(req, res) => {
    try {
        await author_Model.createNewAuthor(req.user.email,req.body.name)
        return res.redirect('/admin/author')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/author')
    }
    
};
let updateauthor = async(req, res) => {
    try {
        await author_Model.updateAuthor(req.body.name,req.user.email,req.body.id)
        res.redirect(req.get('referer'));
    } catch (error) {
        console.log(error)
        res.redirect(req.get('referer'));
    }
    
};
let deleteauthor = async(req, res) => {
    try {
        await author_Model.deleteAuthor(req.params.id_ad,req.user.email)
        res.redirect(req.get('referer'));
    } catch (error) {
        console.log(error)
        res.redirect(req.get('referer'));
    }
};
let backauthor = async(req, res) => {
    try {
        await author_Model.getAuthorBack(req.params.id_ad,req.user.email)
        return res.redirect('/admin/author')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/author')
    }
};
let searchauthor = async(req, res) => {
    try {
        let authorDelete = await author_Model.getDeleteAuthor()
        let author = await author_Model.SearchAuthor(req.query.name)
        return res.render("adminpage/author", {
            check:req.user,
            totalDelete: authorDelete.length,
            delete: authorDelete,
            author: author,
            layout:'admin'
        });
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/author')
    }
};
module.exports = {
    getPageauthor:getPageauthor,
    createNewauthor:createNewauthor,
    updateauthor:updateauthor,
    deleteauthor:deleteauthor,
    searchauthor:searchauthor,
    backauthor:backauthor
}