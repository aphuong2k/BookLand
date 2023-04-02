const dbConnect = require("../dbConnect");

let getTop5BestSale = (month) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT order_detail.product_id,product_name,image,price_input,price_output,sum(order_detail.quantity) as quantity FROM book_store.order_detail join book_store.products on order_detail.product_id = products.product_id where month(order_detail.create_at) = ${month} and year(order_detail.create_at) = 2022  group by product_id order by sum(order_detail.quantity) desc limit 5 ;`;

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
let getTop5Input = (month) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT order_input_detail.product_id,product_name,image,price_input,price_output,sum(order_input_detail.quantity) as quantity FROM book_store.order_input_detail join book_store.products on order_input_detail.product_id = products.product_id where month(order_input_detail.create_at) = ${month} and year(order_input_detail.create_at) = 2022  group by product_id order by sum(order_input_detail.quantity) desc limit 5 ;`;

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
let getTop5BadSale = (month) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT order_detail.product_id,product_name,image,price_input,price_output,sum(order_detail.quantity) as quantity FROM book_store.order_detail join book_store.products on order_detail.product_id = products.product_id where month(order_detail.create_at) = ${month} and year(order_detail.create_at) = 2022  group by product_id order by sum(order_detail.quantity) asc limit 5 ;`;

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

let statisticOrder = (month) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT count(order_id) as count, sum(total) as total FROM book_store.order where month(create_at) = ${month} and year(create_at) = 2022;;`;

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
let statisticOrderInput = (month) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT count(id_order_input) as count, sum(total) as total FROM book_store.order_input where month(create_at) = ${month} and year(create_at) = 2022;`;

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
let productSale0inMonth = (month) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT product_id,product_name,image,price_input,price_output,quantity FROM book_store.products where product_id not in (select product_id from book_store.order_detail where month(create_at) = ${month});`;

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
    getTop5BestSale:getTop5BestSale,
    getTop5BadSale:getTop5BadSale,
    statisticOrder:statisticOrder,
    statisticOrderInput:statisticOrderInput,
    getTop5Input:getTop5Input,
    productSale0inMonth:productSale0inMonth
}