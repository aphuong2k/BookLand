const genre_Model = require('../../models/admin/admin_genre_Model');
const category_Model = require('../../models/admin/admin_category_Model');
var PAGE_SIZE = 6;
let getPagegenre = async(req, res) => {
        var page = req.query.page
        page = parseInt(page)
        var S = (page - 1) * PAGE_SIZE
        let genreDelete = await genre_Model.getDeleteGenre();
        let category = await category_Model.getFullcategory();
        let genre;
        if(!page){
            genre = await genre_Model.getgenre(PAGE_SIZE,0)
        }else{
            genre = await genre_Model.getgenre(PAGE_SIZE,S)
        }
        
        try {
            let total = await genre_Model.getFullgenre();
            let totalpage
            if(total.length % PAGE_SIZE == 0){
                totalpage = total.length / PAGE_SIZE
            }else{
                totalpage = (total.length - total.length % PAGE_SIZE) / PAGE_SIZE + 1
            }
            return res.render("adminpage/genre", {
                check:req.user,
                page:page,
                total: totalpage,
                name:"genre",
                user:"admin",
                genre: genre,
                totalDelete: genreDelete.length,
                delete: genreDelete,
                category:category,
                errors: req.flash("errors"),
                success: req.flash("success"),
                layout:'admin'
            });
        } catch (error) {
            console.log(error)
            return error
        }
    
};
let createNewgenre = async(req, res) => {
    try {
        await genre_Model.createNewgenre(req.user.email,req.body.name,req.body.id_ctg)
        return res.redirect('/admin/genre')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/genre')
    }
    
};
let updategenre = async(req, res) => {
    try {
        await genre_Model.updategenre(req.body.name,req.user.email,req.body.id,req.body.id_ctg)
        return res.redirect('/admin/genre')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/genre')
    }
    
};
let deletegenre = async(req, res) => {
    try {
        await genre_Model.deletegenre(req.params.id_ad,req.user.email)
        return res.redirect('/admin/genre')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/genre')
    }
};
let backGenre= async(req, res) => {
    try {
        await genre_Model.getGenreBack(req.params.id_ad,req.user.email)
        return res.redirect('/admin/genre')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/genre')
    }
};
let searchgenre = async(req, res) => {
    try {
        let genreDelete = await genre_Model.getDeleteGenre()
        let genre = await genre_Model.Searchgenre(req.query.name)
        return res.render("adminpage/genre", {
            check:req.user,
            totalDelete: genreDelete.length,
            delete: genreDelete,
            genre: genre,
            layout:'admin'
        });
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/genre')
    }
};
module.exports = {
    getPagegenre:getPagegenre,
    createNewgenre:createNewgenre,
    updategenre:updategenre,
    deletegenre:deletegenre,
    searchgenre:searchgenre,
    backGenre:backGenre

}