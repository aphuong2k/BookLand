const dbConnect = require("../dbConnect");

let orderDetail = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT order_id,total,note,book_store.order.create_at,name,content,address,phone,delivery,payment FROM book_store.order join book_store.account_address on account_address.account_address_id = book_store.order.account_address_id where order_id = ${id};`;

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
let orderProductDetail = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT products.product_name,order_detail.product_id,image,products.price_output,order_detail.quantity FROM book_store.order_detail join book_store.products on products.product_id = order_detail.product_id where order_id = ${id};`;

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
let getPageListOrder = (limit,offset) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.order order by create_at desc Limit ${limit} Offset ${offset}`;

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
let getlengPageListOrder = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.order`;

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
let SearchOrder = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.order where order_id Like ${id}`;

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
    orderDetail:orderDetail,
    orderProductDetail:orderProductDetail,
    getPageListOrder:getPageListOrder,
    getlengPageListOrder:getlengPageListOrder,
    SearchOrder:SearchOrder
    
}