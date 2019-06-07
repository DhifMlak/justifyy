const jwt = require('jsonwebtoken')


const tokenValidator = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']
  if (token) {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
      req.token = token
    }


    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = { tokenValidator }