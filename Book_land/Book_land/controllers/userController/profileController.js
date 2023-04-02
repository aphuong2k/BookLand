const auth_userModel = require('./../../models/user/auth_userModel')
const profile_Model = require('./../../models/user/profile_Model')
const user_Model = require('./../../models/user/user_Model')

const {validationResult} = require('express-validator')

// tạo trang profile
let getPageProfile = async(req, res) => {
    let cart_quantity = 0
    let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
    let cart = await user_Model.getAllDetailItemInCart(shopping_cart_id[0].Shopping_cart_id)
    cart_quantity = cart.length
    return res.render("userPage/profile",{
        cart_quantity:cart_quantity,
        user:req.user,
        errors: req.flash("errors"),
        errors_details: req.flash("errors_details"),
        success: req.flash("success")
    })
};
//tạo trang đổi mật khẩu
let getPageChangePw = async(req, res) => {
    let cart_quantity = 0
    let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
    let cart = await user_Model.getAllDetailItemInCart(shopping_cart_id[0].Shopping_cart_id)
    cart_quantity = cart.length
    return res.render("userPage/profile-changepw",{
        cart_quantity:cart_quantity,
        user:req.user,
        errors: req.flash("errors"),
        success: req.flash("success")
    })
};
//tạo trang quản lý địa chỉ
let getPageAddressBook = async(req, res) => {
    let cart_quantity = 0
    let shopping_cart_id = await user_Model.getIdShoppingCart(req.user.account_id)
    let cart = await user_Model.getAllDetailItemInCart(shopping_cart_id[0].Shopping_cart_id)
    cart_quantity = cart.length
    return res.render("userPage/address-book",{
        cart_quantity:cart_quantity,
        user:req.user,
        errors: req.flash("errors"),
        success: req.flash("success"),
        errors_adr:req.flash("errors_adr"),
        address: await profile_Model.getAddress(req.user.account_id),
    })
};
// lấy chi tiết 1 địa chỉ
let getAddress = async(req, res) => {
    let content = await profile_Model.getAddressDetail(req.params.id_ad)
    let detail = content[0].address.split("-");
    return res.render("userPage/address-edit",{
        province:detail[0],
        district:detail[1],
        town:detail[2],
        user:req.user,
        address_detail: content,
    })
};
// tạo và đổi mật khẩu
let changeAndcreatePW = async(req,res) =>{
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/profile/change-password");
    }
    try {
        if(req.user.pass !== ''){
            let match = await auth_userModel.comparePassword(req.body.Oldpassword,req.user)
            if(match === true){
                await auth_userModel.updatePassword(req.body.password,req.user.email)
                req.flash("success",`You have successfully changed your password!`);
                return res.redirect('/profile/change-password')
            }else{
                req.flash("errors",match)
                return res.redirect('/profile/change-password')
            }
        }else{
            await auth_userModel.updatePassword(req.body.password,req.user.email)
            req.flash("success",`You have successfully created your password!`);
            return res.redirect('/profile/change-password')
        }
    } catch (error) {
        req.flash("errors",error)
        return res.redirect('/profile/change-password')
    }
}
// đổi ảnh đại diện
let updateImage = async(req,res) => {
    try {
        if(!req.files) {
            req.flash("errors","Haven't Upload File !")
            return res.redirect('/profile')
        } else {
            // Client sử dụng trường input file có name là "avatar"
            let avatar = req.files.avatar;
            
            // Sử dụng phương thức mv() để lưu file vào thư mục "uploads"
            avatar.mv('./public/images/avatar/' + avatar.name);

            //trả về kết quả
            await auth_userModel.updateImage(req.user.account_id,avatar.name)
            return res.redirect('/')
        }
    } catch (err) {
        console.log(err)
        return res.redirect('/profile')
    }
}
// thêm mới địa chỉ
let createAddress = async(req,res) => {
    let allAddress = await profile_Model.getAddress(req.user.account_id)
    let default_address = 0
    if(allAddress.length == 0){
        default_address = 1
    }
    let newAddress = {
        name: req.body.name,
        content: req.body.content,
        address: req.body.address,
        phone: req.body.phone,
        default: default_address,
        province: req.body.province,
        district: req.body.district,
        town: req.body.town
    };
    try {
        if(newAddress.province == -1 || newAddress.district == -1 || newAddress.town == -1){
            req.flash("errors_adr",`Please check input Province or District or Town to verify account !`);
            return res.redirect('/profile/address-book')
        }else{
            await profile_Model.createNewAddress(newAddress,req.user.name,req.user.account_id)
            req.flash("success",`You have successfully created an address!`);
            return res.redirect('/profile/address-book')
        }
    } catch (error) {
        console.log(error)
    }
    
}
//sửa địa chỉ
let updateAddress = async(req,res) => {
    let newAddress = {
        name: req.body.name,
        content: req.body.content,
        address: req.body.address,
        phone: req.body.phone,
        province: req.body.province,
        district: req.body.district,
        town: req.body.town
    };

    try {
        if(newAddress.province == -1 || newAddress.district == -1 || newAddress.town == -1){
            req.flash("errors_adr",`Please check input Province or District or Town to verify account !`);
            return res.redirect('/profile/address-book')
        }else{
            await profile_Model.updateAddress(newAddress,req.user.name,req.body.id_address)
            req.flash("success",`You have successfully updated an address!`);
            return res.redirect('/profile/address-book')
        }
    } catch (error) {
        console.log(error)
    }
    
}
// thay đổi địa chỉ mặc định
let updateAddressDefault = async(req,res) => {
    try {
        let check = await profile_Model.getAddressDefault(req.user.account_id)
        if(check.length > 0){
            await profile_Model.setAddressNormal(check[0].account_address_id)
        }
        await profile_Model.setAddressDefault(req.params.id_ad)
        req.flash("success",`You have successfully changed the default address!`);
        return res.redirect('/profile/address-book')
    } catch (error) {
        console.log(error)
    }
    
}
// xóa địa chỉ
let deleteAddress = async(req,res) => {
    try {
        await profile_Model.deleteAddress(req.params.id_ad)
        req.flash("success",`You have successfully deleted an address!`);
        return res.redirect('/profile/address-book')
    } catch (error) {
        console.log(error)
    }
}
//đổi thông tin cá nhân
let changeProfileDetail = async(req,res) => {
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors_details", errorsArr);
        return res.redirect("/profile");
    }
    try {
        await profile_Model.changeDetail(req.user.account_id,req.body.phone,req.body.name)
        req.flash("success",`You have successfully changed information!`);
        return res.redirect('/profile')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getPageProfile:getPageProfile,
    getPageChangePw:getPageChangePw,
    changeAndcreatePW:changeAndcreatePW,
    updateImage:updateImage,
    getPageAddressBook:getPageAddressBook,
    createAddress:createAddress,
    getAddress:getAddress,
    updateAddress:updateAddress,
    updateAddressDefault:updateAddressDefault,
    deleteAddress:deleteAddress,
    changeProfileDetail:changeProfileDetail
} ;