// MIT License

// Copyright (c) 2019 Jasti Sri Radhe Shyam

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

'use strict';

const db = require('./db_helper');

const APILogRequest = {
    // tableName: 'tbl_api_log_request',
    // fields: {
    //     id: 'id',
    //     reqUniqueID: 'req_unique_id',
    //     method: 'method',
    //     url: 'url',
    //     headers: 'req_headers',
    //     APIHitTime: 'api_hit_time',
    //     reqData: 'req_data',
    //     ip: 'ip'
    // },
    insertSQLStatement: `
    INSERT
    INTO
    tbl_api_log_request
    SET
    method = ?,
    url = ?,
    req_headers = ?,
    api_hit_time = ?,
    req_data = ?,
    ip = ?,
    req_unique_id = ?`,
    /**
     * API request log details
     * @param {Object} apiDetails
     * @param {String} apiDetails.method - HTTP method
     * @param {String} apiDetails.url - HTTP URL
     * @param {Object} apiDetails.headers - HTTP HEADERS
     * @param {String} apiDetails.APIHitTime - HTTP Request Time
     * @param {Object} apiDetails.reqBody - HTTP Request body
     * @param {String} apiDetails.ip - HTTP Request IP
     * @param {String} apiDetails.reqUniqueID - HTTP server auto generated alpha-numeric ID
     */
    addAPILogRequest: async function ({
        method,
        url,
        headers,
        APIHitTime,
        reqBody,
        ip,
        reqUniqueID
    }) {
        const query = db.format(this.insertSQLStatement,
            [
                method,
                url,
                headers,
                APIHitTime,
                reqBody,
                ip,
                reqUniqueID
            ]);
        const result = await db.query(query)
        return result;
    }
};

module.exports = APILogRequest;
