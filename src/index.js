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

const crypto = require("crypto");

const apiLogRequestModel = require('./api_log_request');
const apiLogResponseModel = require('./api_log_response');

/**
 * API request log
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const APILogRequest = function (req, res, next) {
    const url = req.originalUrl;
    const APIHitTime = new Date().toISOString().split('T').join(' ').split('.')[0];
    const reqBody = JSON.stringify(req.body);
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const randomID = getUUID();
    const method = req.method;
    const headers = JSON.stringify(req.headers);
    const reqStartTime = process.hrtime();
    req.reqStartTime = reqStartTime;
    req.randomReqID = randomID;
    const requestDetails = {
        headers,
        method,
        url,
        APIHitTime,
        reqBody,
        ip,
        reqUniqueID: randomID
    };
    apiLogRequestModel.addAPILogRequest(requestDetails)
        .catch((error) => {
            console.log(error);
        });
    next();
};

/**
 * API response log
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const APILogResponse = function (req, res, next) {
    var temp = res.send;
    let data;
    res.send = function () {
        data = arguments[0];
        temp.apply(this, arguments);
    };
    res.on('finish', () => {
        const endTime = process.hrtime(req.reqStartTime);
        const reqTotalTime = Math.floor(endTime[0] * 1000000 + endTime[1] / 1000);
        const APIEndTime = new Date().toISOString().split('T').join(' ').split('.')[0];
        req.reqTotalTime = reqTotalTime;
        req.APIEndTime = APIEndTime;
        logResponse(req, res, data)
            .catch((error) => {
                console.log(error);
            });
    });
    next();
};

/**
 * log the response in database
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} data 
 */
const logResponse = async function (req, res, data) {
    const APIResponseData = data;
    const randomID = req.randomReqID;
    const responseDetails = {
        APIEndTime: req.APIEndTime,
        resBody: APIResponseData,
        reqUniqueID: randomID,
        reqTotalTime: req.reqTotalTime
    }
    return apiLogResponseModel.addAPILogResponse(responseDetails);
};

/**
 * return 32 char unique random string
 */
const getUUID = function () {
    return crypto.randomBytes(16).toString("hex");
};

module.exports = {
    APILogRequest,
    APILogResponse
};