const dbConnect = require("../dbConnect");

//tạo tên tác giả mới
let createNewcategory = (name,category) => {
    return new Promise(async (resolve, reject) => {
            let sql = `INSERT INTO book_store.category (name_category,create_by,status) VALUES ('${category}','${name}',0);`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Create a new category successfully");
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
// sửa tên tác giả
let updatecategory = (category,name,id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.category set name_category = '${category}', update_by = '${name}' where id_category = ${id}`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Update category successfully");
                });
            } catch (err) {
                reject(err); 
            }
    });
};
// xóa id tác giả ở bảng trung gian vs products
let deleteProductHascategory = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `DELETE FROM book_store.products_has_category WHERE (id_category = ${id})`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(false)
                    }
                    resolve("Delete successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};
//xóa tác giả
let deletecategory = (id , name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.category set status = 1 , update_by = '${name}' where id_category = ${id}`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(false)
                    }
                    resolve("Delete category successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};
let getcategoryBack = (id , name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.category set status = 0 , update_by = '${name}' where id_category = ${id}`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Delete category successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};
// lấy danh sách tên tác giả
let getcategory = (limit,offset) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.category where status = 0 Limit ${limit} Offset ${offset}`;

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
let getDeletecategory = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.category where status = 1 `;

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
let getFullcategory = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.category where status = 0`;

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
let getAllcategory = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.product_has_category WHERE (id_category = ${id})`;

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
// tìm kiếm tên tác giả
let getdetailcategory = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.category WHERE (id_category = ${id})`;

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
let Searchcategory = (name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.category WHERE name_category  like '%${name}%' and status = 0`;

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





module.exports = {
    createNewcategory:createNewcategory,
    updatecategory:updatecategory,
    deleteProductHascategory:deleteProductHascategory,
    deletecategory:deletecategory,
    getcategory:getcategory,
    getAllcategory:getAllcategory,
    getdetailcategory:getdetailcategory,
    Searchcategory:Searchcategory,
    getFullcategory:getFullcategory,
    getDeletecategory:getDeletecategory,
    getcategoryBack:getcategoryBack
}