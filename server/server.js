const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require(".//middleware/credentials");
const cookieParser = require("cookie-parser");
require('dotenv').config();
const clientIP = require('./middleware/ClientIP');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(credentials);
app.use(clientIP);
app.use(cors(corsOptions));
app.use(cookieParser());






const dbURL =
  process.env.MONGO_URL;

mongoose
  .connect(dbURL, {
    useNewUrlParser: true, useUnifiedTopology: true, dbName: 'course-judger',
  })
  .then(() => console.log("DB Connected!"));


app.use('/data', require('./routes/data'));
app.use('/classes', require('./routes/classes'));
app.use('/profs', require('./routes/profs'));
app.use('/schools', require('./routes/schools'));
app.use('/reviews', require('./routes/reviews'));
app.use('/users', require('./routes/users'));


app.listen(3001, console.log("listening on port 3001"));
