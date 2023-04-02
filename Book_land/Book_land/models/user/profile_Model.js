const dbConnect = require("./../dbConnect");

//tạo địa chỉ mới
let createNewAddress = (data,name,id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `INSERT INTO book_store.account_address (content, create_by, account_id, address, id_province, id_district, id_town, phone, name, default_address,status ) VALUES ('${data.content}', '${name}', '${id}', '${data.address}', '${data.province}', '${data.district}', '${data.town}', '${data.phone}', '${data.name}', '${data.default}',0)`;
            //create a new account
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Create a new address successfully");
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
// sửa địa chỉ
let updateAddress = (data,user,id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.account_address set content = '${data.content}' , address = '${data.address}', id_province =  ${data.province} , id_district = ${data.district}, id_town = ${data.town} , phone = '${data.phone}', name = '${user}' where account_address_id = ${id}`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Update address successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};
//xóa địa chỉ
let deleteAddress = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `UPDATE book_store.account_address SET status = '1' WHERE (account_address_id = '${id}');
            `;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(false)
                    }
                    resolve("Delete address successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};
// lấy danh sách địa chỉ tài khoản
let getAddress = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.account_address WHERE (account_id = ${id}) and status = 0 order by default_address desc`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(false)
                    }
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
    });
};
// lấy chi tiết địa chỉ
let getAddressDetail = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.account_address WHERE (account_address_id = ${id})`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(false)
                    }
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
// tìm kiếm địa chỉ mặc định
let getAddressDefault = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.account_address WHERE (default_address = 1 and status = 0 and account_id = ${id})`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
// set địa chỉ từ mặc định về bình thường
let setAddressNormal = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `UPDATE book_store.account_address SET default_address = '0' WHERE (account_address_id = ${id})`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
// set địa chỉ làm mặc định
let setAddressDefault = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `UPDATE book_store.account_address SET default_address = '1' WHERE (account_address_id = ${id})`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve(data);
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
// sửa thông tin cá nhân
let changeDetail = (id,phone,name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `UPDATE book_store.account SET name = '${name}',phone = '${phone}' WHERE (account_id = ${id})`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve('success');
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};


module.exports = {
    createNewAddress:createNewAddress,
    updateAddress:updateAddress,
    deleteAddress:deleteAddress,
    getAddress:getAddress,
    getAddressDetail:getAddressDetail,
    setAddressNormal:setAddressNormal,
    setAddressDefault:setAddressDefault,
    getAddressDefault:getAddressDefault,
    changeDetail:changeDetail

}