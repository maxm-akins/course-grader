const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const short = require('short-uuid');




const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: false,
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    fullName: {
        type: String,
        required: false,
    },
    refreshToken: {
        type: String,
        required: false,
    },
    reviewRefs: {
        type: Array,
        required: false,
    },
    joined: {
        type: Date,
        required: true,
        default: new Date()
    },
    uuid: {
        type: String,
        default: short.generate(),
        required: true
    }

});

module.exports = mongoose.model("users", UserSchema);
