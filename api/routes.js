const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { rateLimiter } = require('./middleware/ratelimter')
const { tokenValidator } = require('./middleware/tokenValidator')

router.post('/justify',tokenValidator,rateLimiter, (req, res) => {
    res.send(justify(req.body, 80))
})

router.post('/token', (req, res) => {
    res.send({ token: jwt.sign({email:req.body.email}, process.env.JWT_SECRET,{ expiresIn: '24h'}) })
})

const justify = (text, len) => {
    const re = RegExp("(?:\\s|^)(.{1," + len + "})(?=\\s|$)", "g");
    console.log(text);
   let lines = text.split(re);


    lines = lines.filter((line) => line !== "");
    let i = -1;
    while (++i < lines.length-1) {
        let spaceIndex = lines[i].indexOf(' ');
      
        while (lines[i].length < len) {
           lines[i] = lines[i].insertAt( spaceIndex," ");
            spaceIndex = lines[i].indexOf(' ', spaceIndex + 2);
        }

    }
     return lines.join('\n');;
}
String.prototype.insertAt = function (index,string) {
    if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);

  return string + this;
};
module.exports = router;
module.exports.justify = justify;