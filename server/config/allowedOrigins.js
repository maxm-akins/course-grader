
// const allowedOrigins = [
//     'https://www.yoursite.com',
//     'http://127.0.0.1:5500',
//     'http://localhost:3001',
//     'http://localhost:3000',
// ];

// module.exports = allowedOrigins;

require("dotenv").config();


const allowedOrigins = [
    process.env.ALLOWED_ORIGIN,
];

module.exports = allowedOrigins;


// require("dotenv").config();


// const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(" ");

// module.exports = allowedOrigins;