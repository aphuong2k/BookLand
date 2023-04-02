const dbConnect = require("../dbConnect");

//tạo tên tác giả mới
// sửa tên tác giả
let updateaccount = (role,name,id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.account set role = ${role}, update_by = '${name}' where account_id = ${id}`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Update account successfully");
                });
            } catch (err) {
                reject(err); 
            }
    });
};

//xóa tác giả
let deleteaccount = (id , name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.account set status = 0 , update_by = '${name}' where account_id = ${id}`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(false)
                    }
                    resolve("Delete account successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};
let getaccountBack = (id , name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.account set status = 1 , update_by = '${name}' where account_id = ${id}`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Delete account successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};
// lấy danh sách tên tác giả
let getaccount = (limit,offset) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.account where status = 1 Limit ${limit} Offset ${offset}`;

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
    });
};
let getDeleteaccount = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.account where status = 0 `;

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
    });
};
let getFullaccount = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.account where status = 1`;

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
    });
};
// lấy danh sách tác giả trong bảng trung gian

// tìm kiếm tên tác giả
let getdetailaccount = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.account WHERE (account_id = ${id})`;

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
let Searchaccount = (name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.account WHERE name  like '%${name}%' or account_id like '%${name}%' and status = 1`;

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
let getPageListOrder = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.order where account_id = ${id}  order by create_at desc`;

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
    });
};
let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM account WHERE account_id = ${id}`;

        try {
            dbConnect.query(sql,(err,data)=>{
                if(err){
                    reject(err)
                }
                    resolve(data)
                
            });
        } catch (err) {
            reject(err);
        }
    });
};



module.exports = {
    updateaccount:updateaccount,
    deleteaccount:deleteaccount,
    getaccount:getaccount,
    getdetailaccount:getdetailaccount,
    Searchaccount:Searchaccount,
    getFullaccount:getFullaccount,
    getDeleteaccount:getDeleteaccount,
    getaccountBack:getaccountBack,
    getPageListOrder:getPageListOrder,
    findUserById:findUserById
}