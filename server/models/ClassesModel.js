const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClassesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    schoolCode: {
        type: String,
        required: true,
    },

    classCode: {
        type: String,
        required: true,
    },
    prof: {
        type: String,
        required: true,
    },
    parentRef: {
        type: mongoose.Schema.Types.ObjectId,
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

});

module.exports = mongoose.model("classes", ClassesSchema);
