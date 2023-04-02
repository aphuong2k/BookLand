const dbConnect = require("../dbConnect");

//tạo tên tác giả mới
let createNewproduct = (isbn,name,product,description,price_display,percent_sale,image,price_output,price_input,publish_id,genre_id,pages,time_public,language) => {
    return new Promise(async (resolve, reject) => {
            let sql = `INSERT INTO book_store.products (isbn,product_name,buy_turn,quantity,status,description,create_by,image,price_display,percent_sale,price_output,price_input,publish_id,genre_id,pages,time_public,language) VALUES ('${isbn}','${product}',0,0,0,'${description}','${name}','${image}','${price_display}','${percent_sale}','${price_output}','${price_input}','${publish_id}','${genre_id}','${pages}','${time_public}','${language}');`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Create a new products successfully");
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
// sửa tên tác giả
let updateproduct = (isbn,product,name,id,description,image,price_display,percent_sale,price_output,price_input,publish_id,genre_id,pages,time_public,language) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.products set product_name = '${product}',update_by = '${name}',description = '${description}',percent_sale = '${percent_sale}',,image = '${image}',price_display = '${price_display}',price_output = '${price_output}',price_input = '${price_input}',publish_id = '${publish_id}',genre_id = '${genre_id}',pages = '${pages}',time_public = '${time_public}',language = '${language}' where product_id = ${id}`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Update product successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};

//xóa tác giả
let deleteproduct = (name,id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.products set status = '1', update_by = '${name}' where product_id = ${id}`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Update products successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};

// lấy danh sách tên tác giả
let getproduct = (limit,offset) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT isbn,product_id ,product_name ,buy_turn ,quantity , description ,image ,price_display,percent_sale,price_output ,price_input ,publish_name ,genre_name ,products.create_at ,products.create_by ,products.update_at ,products.update_by ,pages ,time_public ,language FROM book_store.products join book_store.genre on products.genre_id = genre.genre_id join  book_store.publish  on products.publish_id = publish.publish_id where products.status = 0 Limit ${limit} Offset ${offset}`;

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
let getDetailproduct = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT isbn,percent_sale,price_display,product_id ,product_name ,buy_turn ,quantity , description ,image ,price_output ,price_input ,products.publish_id,publish_name ,products.genre_id,genre_name ,products.create_at ,products.create_by ,products.update_at ,products.update_by ,pages ,time_public ,language FROM book_store.products join book_store.genre on products.genre_id = genre.genre_id join  book_store.publish  on products.publish_id = publish.publish_id where product_id = ${id}`;

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
let getDetailProductHasAuthor = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT product_id,products_has_author.author_id , author_name FROM book_store.products_has_author join book_store.author on products_has_author.author_id = author.author_id where product_id = ${id};`;

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

let getFullproduct = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.products where status = 0`;

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

let getTop1product = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.products ORDER BY product_id DESC LIMIT 1`;

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
let InsertProductHasAuthor = (product_id,author_id,name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `INSERT INTO book_store.products_has_author (product_id, author_id ,create_by) VALUES ('${product_id}', '${author_id}','${name}')`;
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

// tìm kiếm tên tác giả
let getdetailproduct = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.product WHERE (product_id = ${id})`;

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
let Searchproduct = (name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.products WHERE product_name  like '%${name}%' and status = 0`;

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
let getProductBack = (id , name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Update book_store.products set status = 0 , update_by = '${name}' where product_id = ${id}`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Delete product successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};
let getDeleteProduct = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.products where status = 1 `;

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
let UpdateQuantity = (total,id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `UPDATE book_store.products SET quantity = '${total}' WHERE (product_id = '${id}');`

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
let randomProduct = (limit) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.products AS t1 JOIN (SELECT product_id FROM book_store.products where status = 0 ORDER BY RAND() LIMIT ${limit}) as t2 ON t1.product_id=t2.product_id;`

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
    createNewproduct:createNewproduct,
    updateproduct:updateproduct,
    deleteproduct:deleteproduct,
    getproduct:getproduct,
    getdetailproduct:getdetailproduct,
    Searchproduct:Searchproduct,
    getFullproduct:getFullproduct,
    getTop1product:getTop1product,
    InsertProductHasAuthor:InsertProductHasAuthor,
    getDetailproduct:getDetailproduct,
    getDetailProductHasAuthor:getDetailProductHasAuthor,
    getProductBack:getProductBack,
    getDeleteProduct:getDeleteProduct,
    UpdateQuantity:UpdateQuantity,
    randomProduct:randomProduct


}