const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
    },
    courseRefs: {
        type: Array,
        required: true,
        default: [],
    },
    schoolRefs: {
        type: Array,
        required: true,
        default: [],
    }


});

module.exports = mongoose.model("profs", ProfSchema);
