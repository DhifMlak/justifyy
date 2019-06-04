const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/justify',(req,res)=>{
    res.send({ message: 'Justified text here....'})
  })
  router.post('/token',(req,res)=>{
    res.send({ token: jwt.sign( req.body.email , ' secret_pass ') })
  })
  module.exports = router;