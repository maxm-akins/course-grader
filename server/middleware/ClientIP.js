
const clientIP = (req, res, next) => {
    console.log(req?.headers["x-originating-ip"]);
    next();
}

module.exports = clientIP;