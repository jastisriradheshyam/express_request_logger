'use strict';

const mysql = require('mysql');
const config = require('./config.json');

var pool;
const sqlOptions = {
    connectionLimit: 2, //important
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name,
    port: config.db_port,
    dateStrings: 'date'
    // debug: true
}

try {
    pool = mysql.createPool(sqlOptions);
} catch (error) {
    console.log("Connection Pool Error : ", error);
    process.exit(1);
}

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if (connection) connection.release()

    return
});

module.exports = pool;