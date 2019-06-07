const express = require('express')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.text({type:"*/*"}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const api = require('./api/routes')
app.use('/api', api);

app.listen(3000, ()=>{
    console.log('Listening on port:3000')
  })