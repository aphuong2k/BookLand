const dbConnect = require("../dbConnect");

//tạo tên tác giả mới
let createNewgenre = (name,genre,id_ctg) => {
    return new Promise(async (resolve, reject) => {
            let sql = `INSERT INTO book_store.genre (genre_name,create_by,category_id,status) VALUES ('${genre}','${name}',${id_ctg},0);`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Create a new genre successfully");
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
// sửa tên tác giả
let updategenre = (genre,name,id,id_ctg) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.genre set genre_name = '${genre}', update_by = '${name}', category_id = ${id_ctg} where genre_id = ${id}`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Update genre successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};

//xóa tác giả
let deletegenre = (id , name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.genre set status = 1 , update_by = '${name}' where genre_id = ${id}`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(false)
                    }
                    resolve("Delete genre successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};
// lấy danh sách tên tác giả
let getgenre = (limit,offset) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT genre_id , genre_name , name_category , id_category , genre.create_at , genre.create_by , genre.update_at , genre.update_by FROM book_store.genre join book_store.category where category_id = id_category and genre.status = 0 Limit ${limit} Offset ${offset}`;

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
let getFullgenre = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT genre_id , genre_name , name_category , id_category , genre.create_at , genre.create_by , genre.update_at , genre.update_by FROM book_store.genre join book_store.category where category_id = id_category and genre.status = 0`;

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

let getdetailgenre = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.genre WHERE (genre_id = ${id})`;

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
let Searchgenre = (name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.genre WHERE genre_name  like '%${name}%' and status = 0`;

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
let getGenreBack = (id , name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.genre set status = 0 , update_by = '${name}' where genre_id = ${id}`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Delete genre successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};
// lấy danh sách tên tác giả
let getDeleteGenre = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT genre_id , genre_name , name_category , id_category , genre.create_at , genre.create_by , genre.update_at , genre.update_by FROM book_store.genre join book_store.category where category_id = id_category and genre.status = 1 `;

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





module.exports = {
    createNewgenre:createNewgenre,
    updategenre:updategenre,
    deletegenre:deletegenre,
    getgenre:getgenre,
    getFullgenre:getFullgenre,
    getdetailgenre:getdetailgenre,
    Searchgenre:Searchgenre,
    getGenreBack:getGenreBack,
    getDeleteGenre:getDeleteGenre

}