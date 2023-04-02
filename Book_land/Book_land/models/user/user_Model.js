const dbConnect = require("../dbConnect");

let getIdShoppingCart = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.shopping_cart where account_id = ${id};`;
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
let addShoppingCart = (Shopping_cart_id,product_id,product_quantity) => {
    return new Promise(async (resolve, reject) => {
            let sql = `INSERT INTO book_store.shopping_cart_has_products (Shopping_cart_id,product_id,product_quantity) VALUES ('${Shopping_cart_id}','${product_id}','${product_quantity}');`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Add shopping cart successfully");
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
let getAllItemInCart = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.shopping_cart_has_products where Shopping_cart_id = ${id};`;
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
let getAllDetailItemInCart = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `Select shopping_cart_has_products.product_id,image,price_output,product_name,product_quantity,Shopping_cart_id from book_store.shopping_cart_has_products join book_store.products on shopping_cart_has_products.product_id = products.product_id where Shopping_cart_id = ${id} and products.status = 0;`;
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
let UpdateShoppingCart = (Shopping_cart_id,product_id,product_quantity) => {
    return new Promise(async (resolve, reject) => {
            let sql = `UPDATE book_store.shopping_cart_has_products SET product_quantity = ${product_quantity} WHERE (Shopping_cart_id = '${Shopping_cart_id}') and (product_id = '${product_id}');
            ;`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Update shopping cart successfully");
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};

let deleteItemShoppingCart = (Shopping_cart_id,product_id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `DELETE FROM book_store.shopping_cart_has_products WHERE (Shopping_cart_id = ${Shopping_cart_id}) and (product_id = '${product_id}');`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Update shopping cart successfully");
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
let checklProductExistInCart = (idsp,idpr) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.shopping_cart_has_products where Shopping_cart_id = ${idsp} and product_id = ${idpr};`;
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
let createNewOrder = (total,account_id,account_address_id,note,delivery,payment,name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `INSERT INTO book_store.order (total,status,note,create_by,account_id,account_address_id,delivery,payment) VALUES ('${total}',1,'${note}','${name}','${account_id}','${account_address_id}','${delivery}','${payment}');`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Create a new order successfully");
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
let updateStatusOrder = (order_id,status,name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `UPDATE book_store.order SET status = ${status} , update_by = '${name}' WHERE (order_id = '${order_id}')`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Update status successfully");
                });
            } catch (err) {
                reject(err);
            }
    });
};
let getTop1_Oder = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.order where account_id = ${id} ORDER BY order_id DESC LIMIT 1`;

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
let createOrderDetail = (quantity,order_id,product_id,name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `INSERT INTO book_store.order_detail (quantity,order_id,product_id,create_by) VALUES ('${quantity}','${order_id}','${product_id}','${name}');`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Create a  order detail successfully");
                });
            } catch (err) {
                reject(err);
            }
        // }
    });
};
let UpdateQuantity = (total,id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `UPDATE book_store.products SET quantity = quantity - ${total} , buy_turn = buy_turn + ${total} WHERE (product_id = '${id}');`

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
let UpdateProductWhenDelete = (total,id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `UPDATE book_store.products SET quantity = quantity + ${total} , buy_turn = buy_turn - ${total} WHERE (product_id = '${id}');`

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
let getPageListOrderNow = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.order where account_id = ${id} and status > 0 and status < 4 order by create_at desc`;

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
let getPageListOrderCancel = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.order where account_id = ${id} and status = 0  order by create_at desc`;

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
let getPageListOrderComplete = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.order where account_id = ${id} and status = 4  order by create_at desc`;

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
let updateAddressId = (address_id,order_id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `UPDATE book_store.order SET account_address_id = '${address_id}' WHERE (order_id = '${order_id}');`;

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
let SearchProduct = (year,genre,publish) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.products WHERE time_public  like '%${year}%'and genre_id like '%${genre}%'and publish_id like '%${publish}%'and status = 0`;

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
let SearchProductHead = (name) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM  book_store.products join book_store.products_has_author on products.product_id = products_has_author.product_id join book_store.author on products_has_author.author_id = author.author_id where product_name  like '%${name}%'or products.isbn like '%${name}%'or author.author_name like '%${name}%'and products.status = 0`;

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
let getproductCategory = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT * FROM book_store.products join book_store.genre on products.genre_id = genre.genre_id join book_store.category on genre.category_id = category.id_category where category_id = ${id} and products.status = 0`;

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
let getGenreFromCategory = (id) => {
    return new Promise(async (resolve, reject) => {
            let sql = `SELECT genre_id,genre_name FROM book_store.genre join book_store.category on genre.category_id = category.id_category where category.id_category = ${id}`;

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
    getIdShoppingCart:getIdShoppingCart,
    addShoppingCart:addShoppingCart,
    UpdateShoppingCart:UpdateShoppingCart,
    deleteItemShoppingCart:deleteItemShoppingCart,
    checklProductExistInCart:checklProductExistInCart,
    getAllItemInCart:getAllItemInCart,
    getAllDetailItemInCart:getAllDetailItemInCart,
    createNewOrder:createNewOrder,
    updateStatusOrder:updateStatusOrder,
    getTop1_Oder:getTop1_Oder,
    createOrderDetail:createOrderDetail,
    UpdateQuantity:UpdateQuantity,
    getPageListOrderNow:getPageListOrderNow,
    getPageListOrderComplete:getPageListOrderComplete,
    getPageListOrderCancel:getPageListOrderCancel,
    updateAddressId:updateAddressId,
    orderProductDetail:orderProductDetail,
    orderDetail:orderDetail,
    UpdateProductWhenDelete:UpdateProductWhenDelete,
    SearchProduct:SearchProduct,
    SearchProductHead:SearchProductHead,
    getproductCategory:getproductCategory,
    getGenreFromCategory:getGenreFromCategory
}