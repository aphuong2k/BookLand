const dbConnect = require("../dbConnect");

let createNewOrderInput = (total,name,note) => {
    return new Promise(async (resolve, reject) => {
            let sql = `INSERT INTO book_store.order_input (total,note,create_by) VALUES ('${total}','${name}','${note}');`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Create a new order input successfully");
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
let createOrderInputDetail = (quantity,order_input_id,product_id,name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `INSERT INTO book_store.order_input_detail (quantity,order_input_id,product_id,create_by) VALUES ('${quantity}','${order_input_id}','${product_id}','${name}');`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Create a  order input detail successfully");
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
let getTop1_OderInput = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.order_input ORDER BY id_order_input DESC LIMIT 1`;

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
let getAllInputOrder = (limit,offset) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.order_input  Limit ${limit} Offset ${offset}`;

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
let getTotalInputOrder = () => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select * FROM book_store.order_input`;

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
let searchInputOrder = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.order_input WHERE id_order_input like '%${id}%'`;

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
let selectInputOrder = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.order_input WHERE id_order_input = ${id}`;

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
let getDetailInputOrder = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `select order_input_detail.product_id,product_name,order_input_detail.quantity,price_input,image, order_input_detail.create_at,order_input_detail.create_by from book_store.order_input join book_store.order_input_detail on order_input.id_order_input = order_input_id join book_store.products on order_input_detail.product_id = products.product_id where order_input.id_order_input = ${id}`;

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

module.exports={
    createNewOrderInput:createNewOrderInput,
    createOrderInputDetail:createOrderInputDetail,
    getTop1_OderInput:getTop1_OderInput,
    getTotalInputOrder:getTotalInputOrder,
    getAllInputOrder:getAllInputOrder,
    searchInputOrder:searchInputOrder,
    getDetailInputOrder:getDetailInputOrder,
    selectInputOrder:selectInputOrder
}