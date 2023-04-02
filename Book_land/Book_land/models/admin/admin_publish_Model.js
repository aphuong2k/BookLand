const dbConnect = require("../dbConnect");

//tạo tên tác giả mới
let createNewpublish = (name,publish) => {
    return new Promise(async (resolve, reject) => {
            let sql = `INSERT INTO book_store.publish (publish_name,create_by,status) VALUES ('${publish}','${name}',0);`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Create a new publish successfully");
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
// sửa tên tác giả
let updatepublish = (publish,name,id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.publish set publish_name = '${publish}', update_by = '${name}' where publish_id = ${id}`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Update publish successfully");
                });
            } catch (err) {
                reject(err); 
            }
    });
};

//xóa tác giả
let deletepublish = (id , name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.publish set status = 1 , update_by = '${name}' where publish_id = ${id}`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(false)
                    }
                    resolve("Delete publish successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};
let getpublishBack = (id , name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.publish set status = 0 , update_by = '${name}' where publish_id = ${id}`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Delete publish successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};
// lấy danh sách tên tác giả
let getpublish = (limit,offset) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.publish where status = 0 Limit ${limit} Offset ${offset}`;

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
let getDeletepublish = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.publish where status = 1 `;

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
let getFullpublish = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.publish where status = 0`;

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
let getAllpublish = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.product_has_publish WHERE (publish_id = ${id})`;

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
let getdetailpublish = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.publish WHERE (publish_id = ${id})`;

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
let Searchpublish = (name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.publish WHERE publish_name  like '%${name}%' and status = 0`;

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
    createNewpublish:createNewpublish,
    updatepublish:updatepublish,
    deletepublish:deletepublish,
    getpublish:getpublish,
    getAllpublish:getAllpublish,
    getdetailpublish:getdetailpublish,
    Searchpublish:Searchpublish,
    getFullpublish:getFullpublish,
    getDeletepublish:getDeletepublish,
    getpublishBack:getpublishBack
}