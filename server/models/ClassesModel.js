const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    trunkName: {
        type: String,
        required: true,
    },
    descripCode: {
        type: String,
        required: true,
    },
    classCode: {
        type: String,
        required: true,
    },
    profs: {
        type: Array,
        required: true,
        default: []
    },
    schoolRef: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
    prevRating: {
        type: Number,
        required: false,
    },
    uuid: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("classes", ClassesSchema);
