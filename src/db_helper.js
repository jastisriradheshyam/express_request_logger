'use strict';
const pool = require('./connection');
const mysql = require('mysql');

/**
 * Executes SQL query and returns data.
 * @constructor
 * @param {string} queryText - SQL query string.
 * @param {boolean} singleRecord - single record.
 */
const querySQLSync = function (queryText, singleRecord) {
    return new Promise(function (resolve, reject) {
        pool.query(queryText, function (err, data, fields) {
            // Error
            if (err) return reject(err);
            // For single record
            if (typeof (singleRecord) == "boolean" && singleRecord) return resolve(data[0]);
            // For multiple records
            return resolve(data);
        });
    });
};
const query = querySQLSync;
const format = mysql.format;
const escape = mysql.escape;

module.exports = {
    querySQLSync,
    query,
    format,
    escape
};