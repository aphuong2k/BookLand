const product_Model = require('../../models/admin/admin_product_Model');
const genre_Model = require('../../models/admin/admin_genre_Model');
const publish_Model = require('../../models/admin/admin_publish_Model');
const author_Model = require('../../models/admin/admin_author_Model');

var PAGE_SIZE = 6;
let getPageproduct = async(req, res) => {
        var page = req.query.page
        page = parseInt(page)
        var S = (page - 1) * PAGE_SIZE
        let product;
        let productDelete = await product_Model.getDeleteProduct()
        if(!page){
            product = await product_Model.getproduct(PAGE_SIZE,0)
        }else{
            product = await product_Model.getproduct(PAGE_SIZE,S)
        }
        
        try {
            let total = await product_Model.getFullproduct();
            let totalpage
            if(total.length % PAGE_SIZE == 0){
                totalpage = total.length / PAGE_SIZE
            }else{
                totalpage = (total.length - total.length % PAGE_SIZE) / PAGE_SIZE + 1
            }
            return res.render("adminpage/product", {
                check:req.user,
                page:page,
                total: totalpage,
                product: product,
                name:"product",
                user:"admin",
                totalDelete: productDelete.length,
                delete: productDelete,
                publish: await publish_Model.getFullpublish(),
                genre: await genre_Model.getFullgenre(),
                author: await author_Model.getFullAuthor(),
                errors: req.flash("errors"),
                success: req.flash("success"),
                layout:'admin'
            });
        } catch (error) {
            console.log(error)
            return error
        }
    
};
let createNewproduct = async(req, res) => {
    try {
        if(!req.files) {
            req.flash("errors","Haven't Upload File !")
            return res.redirect('/admin/product')
        } else {
            let avatar = req.files.avatar;
            avatar.mv('./public/images/products/' + avatar.name);
            var parsed = JSON.parse(req.body.author_id)
            await product_Model.createNewproduct(req.body.isbn,req.user.email,req.body.name,req.body.description,req.body.price_display,req.body.percent_sale,avatar.name,req.body.price_output,req.body.price_input,req.body.publish_id,req.body.genre_id,req.body.page,req.body.time_public,req.body.language)
            let topProduct = await product_Model.getTop1product()
            parsed.forEach(async (element) => await product_Model.InsertProductHasAuthor(topProduct[0].product_id,element,req.user.email)); 
            return res.redirect('/admin/product')
        }
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/product')
    }
    
};
let getDetailProduct = async(req, res) => {
    let content = await product_Model.getDetailproduct(req.params.id_ad)
    return res.render("adminpage/edit_product",{
        check:req.user,
        detail_product: content,
        time:toJSONLocal(content[0].time_public),
        publish: await publish_Model.getFullpublish(),
        genre: await genre_Model.getFullgenre(),
        author: await author_Model.getFullAuthor(),
        product_author: await product_Model.getDetailProductHasAuthor(req.params.id_ad),
        layout:'admin'
    })
};
let getAllDetailProduct = async(req, res) => {
    let content = await product_Model.getDetailproduct(req.params.id)
    return res.render("adminpage/detail_product",{
        check:req.user,
        detail_product: content,
        time:toJSONLocal(content[0].time_public),
        product_author: await product_Model.getDetailProductHasAuthor(req.params.id),
        layout:'admin'
    })
};

let updateproduct = async(req, res) => {
    try {
        if(!req.files) {
            req.flash("errors","Haven't Upload File !")
            return res.redirect('/admin/product')
        } else {
        let avatar = req.files.avatar;
        avatar.mv('./public/images/products/' + avatar.name);
        await product_Model.updateproduct(req.body.isbn,req.body.name,req.user.email,req.body.id,req.body.description,avatar.name,req.body.price_display,req.body.percent_sale,req.body.price_output,req.body.price_input,req.body.publish_id,req.body.genre_id,req.body.page,req.body.time_public,req.body.language)
        return res.redirect('/admin/product')
        }
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/product')
    }
    
};
let deleteproduct = async(req, res) => {
    try {
        await product_Model.deleteproduct(req.user.email,req.params.id_ad)
        return res.redirect('/admin/product')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/product')
    }
};
let searchproduct = async(req, res) => {
    try {
        let productDelete = await product_Model.getDeleteProduct()
        let product = await product_Model.Searchproduct(req.query.name)
        return res.render("adminpage/product", {
            check:req.user,
            totalDelete: productDelete.length,
            delete: productDelete,
            product: product,
            layout:'admin'
        });
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/product')
    }
}
let backProduct = async(req, res) => {
    try {
        await product_Model.getProductBack(req.params.id_ad,req.user.email)
        return res.redirect('/admin/product')
    } catch (error) {
        console.log(error)
        return res.redirect('/admin/product')
    }
};
function toJSONLocal(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }
module.exports = {
    getPageproduct:getPageproduct,
    createNewproduct:createNewproduct,
    updateproduct:updateproduct,
    deleteproduct:deleteproduct,
    searchproduct:searchproduct,
    getDetailProduct:getDetailProduct,
    backProduct:backProduct,
    getAllDetailProduct:getAllDetailProduct
}