const reqLogger = require('../src');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// create application/json parser
const jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(jsonParser,urlencodedParser);

app.use(reqLogger.APILogRequest,reqLogger.APILogResponse);

app.use('/',(req,res,next)=>{
    res.json({
        data: req.body
    })
})
var http = require('http')

http.createServer(app).listen(8010);