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

const APILogResponse = {
    // tableName: 'tbl_api_log_response',
    // fields: {
    //     id: 'id',
    //     reqUniqueID: 'req_unique_id',
    //     APIEndTime: 'api_end_time',
    //     resData: 'res_data',
    //     reqTotalTime: 'req_total_time'
    // },
    insertSQLStatement: `
    INSERT
    INTO
    tbl_api_log_response
    SET
    req_unique_id = ?,
    api_end_time = ?,
    res_data = ?,
    req_total_time = ?
    `,
    /**
     * API response log details
     * @param {Object} apiDetails
     * @param {String} apiDetails.reqUniqueID - HTTP server auto generated alpha-numeric ID
     * @param {String} apiDetails.APIEndTime - HTTP Request end time
     * @param {Object} apiDetails.resBody - HTTP Response body
     * @param {Number} apiDetails.reqTotalTime - HTTP Request to Response total time
     * 
     */
    addAPILogResponse: async function ({
        reqUniqueID,
        APIEndTime,
        resBody,
        reqTotalTime
    }) {
        const query = db.format(this.insertSQLStatement,
            [
                reqUniqueID,
                APIEndTime,
                resBody,
                reqTotalTime
            ]);
        const result = await db.query(query);
        return result;
    }
};

module.exports = APILogResponse;
