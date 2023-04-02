const mysql = require('mysql2');
const dbConfig = require("../configs/db.config");

    let connection = mysql.createConnection({
        host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            port: dbConfig.PORT,
            database: dbConfig.DB
    });
    
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Database connected!");
    });


module.exports = connection;