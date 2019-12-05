const db = require('./db_helper');

const APILogResponse = {
    tableName: 'tbl_api_log_response',
    fields: {
        id: 'id',
        reqUniqueID: 'req_unique_id',
        APIEndTime: 'api_end_time',
        resData: 'res_data',
        reqTotalTime: 'req_total_time'
    },
    /**
     * api log details
     * @param {Object} apiDetails 
     */
    addAPILogResponse: function (apiDetails) {
        return new Promise(async (resolve, reject) => {
            const {
                reqUniqueID,
                APIEndTime,
                resBody,
                reqTotalTime
            } = apiDetails;
            const queryString = `
            INSERT
            INTO
            ${this.tableName}
            SET
            ${this.fields.reqUniqueID} = ?,
            ${this.fields.APIEndTime} = ?,
            ${this.fields.resData} = ?,
            ${this.fields.reqTotalTime} = ?`;
            const query = db.format(queryString,
                [
                    reqUniqueID,
                    APIEndTime,
                    resBody,
                    reqTotalTime
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

module.exports = APILogResponse;
