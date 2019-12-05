const db = require('./db_helper');

const APILogRequest = {
    tableName: 'tbl_api_log_request',
    fields: {
        id: 'id',
        reqUniqueID: 'req_unique_id',
        method: 'method',
        url: 'url',
        headers: 'req_headers',
        APIHitTime: 'api_hit_time',
        reqData: 'req_data',
        ip: 'ip'
    },
    /**
     * api log details
     * @param {Object} apiDetails 
     */
    addAPILogRequest: function (apiDetails) {
        return new Promise(async (resolve, reject) => {
            const {
                method,
                url,
                headers,
                APIHitTime,
                reqBody,
                ip,
                reqUniqueID
            } = apiDetails;
            const queryString = `
            INSERT
            INTO
            ${this.tableName}
            SET
            ${this.fields.method} = ?,
            ${this.fields.url} = ?,
            ${this.fields.headers} = ?,
            ${this.fields.APIHitTime} = ?,
            ${this.fields.reqData} = ?,
            ${this.fields.ip} = ?,
            ${this.fields.reqUniqueID} = ?`;
            const query = db.format(queryString,
                [
                    method,
                    url,
                    headers,
                    APIHitTime,
                    reqBody,
                    ip,
                    reqUniqueID
                ]);
            db.query(query)
                .then((result) => {
                    resolve(result);
                })
                .catch((error) => {
                    reject(error)
                });
        });
    }
};

module.exports = APILogRequest;
