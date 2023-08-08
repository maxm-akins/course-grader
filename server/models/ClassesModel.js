const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassesSchema = new Schema({
    name: {
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
    parentRef: {
        type: String,
        required: true,
    },
    addedBy: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("classes", ClassesSchema);
