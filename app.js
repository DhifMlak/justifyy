const express = require('express')
const bodyparser = require('body-parser');
const app = express();
app.use(bodyparser.text());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const api = require('./api/routes')
app.use('/api', api);

app.listen(3000, ()=>{
    console.log('port:3000')
  })