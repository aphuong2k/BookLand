const dbConnect = require("./../dbConnect");
const bcrypt = require('bcrypt');


    // Tạo mới user
    let createNewUser = (data) => {
        return new Promise(async (resolve, reject) => {
            // check email is exist or not
            // let isEmailExist = await checkExistEmail(data.email);
            // if (isEmailExist) {
            //     reject(`This email "${data.email}" has already exist. Please choose an other email`);
            // } else {
                // hash password
                let salt = bcrypt.genSaltSync(10);
                let password;
                if(data.genre === 'nor'){   
                      password = bcrypt.hashSync(data.password,salt);
                }else{
                      password =  data.password;
                }
                let sql = `INSERT INTO account (name, pass, email, phone, avatar, role, status, create_by, genre) VALUES ('${data.name}', '${password}', '${data.email}', '${data.phone}', 'avatar.png',1,1,'${data.name}','${data.genre}')`;

    
                //create a new account
                try {
                    dbConnect.query(sql,(err,data)=>{
                        if (err) {
                            reject(false)
                        }
                        resolve("Create a new user successful");
                    });
                } catch (err) {
                    reject(err);
                }
        });
    };
    // set account verify sau khi verify email
    let updateUserVerify = (email) => {
        return new Promise(async (resolve, reject) => {
            let sql = `UPDATE book_store.account SET verify = 'done' WHERE (email = '${email}');`;
                try {
                    dbConnect.query(sql,(err,data)=>{
                        if (err) {
                            reject(false)
                        }
                        resolve("Update successful");
                    });
                } catch (err) {
                    reject(err);
                }
            }
        )};
    // create giỏ hàng cho account
    let createNewUserShoppingCart = (email) => {
        return new Promise(async (resolve, reject) => {
            // check email is exist or not
            let user = await findUserByEmail(email);  
            let sql = `INSERT INTO shopping_cart (account_id) VALUES ('${user.account_id}')`;

                //create a new account
                try {
                    dbConnect.query(sql,(err,data)=>{
                        if (err) {
                            reject(false)
                        }
                        resolve("Create a new shopping_cart successful");
                    });
                } catch (err) {
                    reject(err);
                }
            }
        )};
    // check xem email tồn tại k
    let checkExistEmail = (email) => {
        return new Promise( (resolve, reject) => {
            let sql = `SELECT * FROM account WHERE email = '${email}'`;
            try {
                dbConnect.query(sql,(err,data)=>{
                    if(err){
                        reject(err)
                    }
                    if(data.length > 0){
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    };

    // let handleLogin = (email, password) => {
    //     return new Promise(async (resolve, reject) => {
    //         //check email is exist or not
    //         let user = await findUserByEmail(email);
    //         if (user) {
    //             //compare password
    //             await bcrypt.compare(password, user.password).then((isMatch) => {
    //                 if (isMatch) {
    //                     resolve(true);
    //                 } else {
    //                     reject(`The password that you've entered is incorrect`);
    //                 }
    //             });
    //         } else {
    //             reject(`This user email "${email}" doesn't exist`);
    //         }
    //     });
    // };

    //tìm kiếm account = email
    let findUserByEmail = (email) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM account WHERE email = '${email}'`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if(err){
                        reject(err)
                    }if(data.length>0){
                        let user = data[0];
                        resolve(user)
                    }else{
                        resolve(false)
                    }
                    
                    
                });
            } catch (err) {
                reject(err);
            }
        });
    };

    //tìm kiếm account = id
    let findUserById = (id) => {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM account WHERE account_id = ${id}`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if(err){
                        reject(err)
                    }
                        let user = data[0];
                        resolve(user)
                    
                });
            } catch (err) {
                reject(err);
            }
        });
    };
    // so sánh password
    let comparePassword = (password, userObject) => {
        return new Promise(async (resolve, reject) => {
            try {
                await bcrypt.compare(password, userObject.pass).then((isMatch) => {
                    if (isMatch) {
                        resolve(true);
                    } else {
                        resolve(`The password that you've entered is incorrect`);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    };
    // so sánh token để verify account
    let verify = (email, token) => {
        return new Promise(async (resolve, reject) => {
            try {
                await bcrypt.compare(email, token).then((isMatch) => {
                    if (isMatch) {
                        resolve(true);
                    } else {
                        resolve(`verify fail`);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    };
    // đổi mật khẩu
    let updatePassword = (password,email) =>{
        return new Promise(async (resolve, reject) => {
            let salt = bcrypt.genSaltSync(10);  
            let sql = `Update book_store.account set pass = '${bcrypt.hashSync(password,salt)}' WHERE email = '${email}'`;

            try {
                dbConnect.query(sql,(err,data)=>{
                    if (err) {
                        reject(err)
                    }
                    resolve("Update password successful");
                });
            } catch (err) {
                reject(err);
            }
        });
    }
    // thay đổi ảnh đại diện
    let updateImage = (id,imageName) => {
        return new Promise(async (resolve, reject) => {
            let sql = `UPDATE book_store.account SET avatar = '${imageName}' WHERE (account_id = ${id});`;
                try {
                    dbConnect.query(sql,(err,data)=>{
                        if (err) {
                            reject(false)
                        }
                        resolve("Update successful");
                    });
                } catch (err) {
                    reject(err);
                }
            }
        )};



    module.exports = {
        createNewUser: createNewUser,
        comparePassword: comparePassword,
        findUserByEmail: findUserByEmail,
        findUserById: findUserById,
        createNewUserShoppingCart:createNewUserShoppingCart,
        checkExistEmail:checkExistEmail,
        updateUserVerify:updateUserVerify,
        verify:verify,
        updatePassword:updatePassword,
        updateImage:updateImage
    };