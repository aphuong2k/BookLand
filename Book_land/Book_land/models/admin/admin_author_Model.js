const dbConnect = require("../dbConnect");

//tạo tên tác giả mới
let createNewAuthor = (name,author) => {
    return new Promise(async (resolve, reject) => {
            let sql = `INSERT INTO book_store.author (author_name,create_by,status) VALUES ('${author}','${name}',0);`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve();
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
// sửa tên tác giả
let updateAuthor = (author,name,id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.author set author_name = '${author}', update_by = '${name}' where author_id = ${id}`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Update author successfully");
                });
            } catch (err) {
                reject(err); 
            }
    });
};

//xóa tác giả
let deleteAuthor = (id , name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.author set status = 1 , update_by = '${name}' where author_id = ${id}`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(false)
                    }
                    resolve("Delete author successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};
let getAuthorBack = (id , name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.author set status = 0 , update_by = '${name}' where author_id = ${id}`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Delete author successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};
// lấy danh sách tên tác giả
let getAuthor = (limit,offset) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.author where status = 0 Limit ${limit} Offset ${offset}`;

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
let getDeleteAuthor = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.author where status = 1 `;

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
let getFullAuthor = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.author where status = 0`;

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
let getAllAuthor = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.product_has_author WHERE (author_id = ${id})`;

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
let getdetailAuthor = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.author WHERE (author_id = ${id})`;

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
let SearchAuthor = (name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.author WHERE author_name  like '%${name}%' and status = 0`;

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
    createNewAuthor:createNewAuthor,
    updateAuthor:updateAuthor,
    deleteAuthor:deleteAuthor,
    getAuthor:getAuthor,
    getAllAuthor:getAllAuthor,
    getdetailAuthor:getdetailAuthor,
    SearchAuthor:SearchAuthor,
    getFullAuthor:getFullAuthor,
    getDeleteAuthor:getDeleteAuthor,
    getAuthorBack:getAuthorBack
}