const redis = require('redis')

const client = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT })
client.on('error', err => console.log(`Error ${err}`));
client.on("ready", (err) => {
    console.log("Ready ");
});



const rateLimiter = (req, res, next) => {
    const token = req.token;
    client.get(token, function (err, reply) {
        let leftWords = 0
        if (reply) {
            leftWords = reply - countWords(req.body);
            if (leftWords > 0) {
                client
                    .multi() // starting a transaction
                    .decrby(token, leftWords) // INCR UUID
                    .exec((err, replies) => {
                        if (err) {
                            return res.status(500).send(err.message)
                        }
                        console.log(replies)
                        return next()
                    })
            }
            else {
                return res
                    .status(402)
                    .send(`payment required`)
            }
        }
        else {
            leftWords = 80000 - countWords(req.body);
            if (leftWords > 0) {
                client
                    .multi() // starting a transaction
                    .set([token, 80000, 'EX', 86400, 'NX']) // SET UUID 0 EX 60 NX
                    .decrby(token,token)
                    .exec((err, replies) => {
                        if (err) {
                            return res.status(500).send(err.message)
                        }
                        return next()
                    })
            }
            else {
                return res
                    .status(402)
                    .send(`payment required`)
            }
        }
    });

}



const countWords = (text) => {
    return text.trim().split(/\s+/).length;
}
module.exports = { rateLimiter }