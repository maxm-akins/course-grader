const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfSchema = new Schema({
    uuid: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    courseRefs: {
        type: Array,
        required: true,
        default: [],
    },
    schoolRef: {
        type: String,
        required: true,
    }


});

module.exports = mongoose.model("profs", ProfSchema);
