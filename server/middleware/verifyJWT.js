const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;;
    console.log("we are in the jwt middleware");
    if(!authHeader) {
        console.log("Request does not have header.")
        return res.sendStatus(401);
    }
    console.log("headers exist");
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    jwt.verify(token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403);
            req.user = decoded.username;
            next();
        }
        );
}

module.exports = verifyJWT;