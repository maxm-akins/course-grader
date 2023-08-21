const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Filter = require('bad-words'),
    filter = new Filter();

const ProfSchema = new Schema({
    uuid: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        validate: {
            validator: function (v) {
                return !filter.isProfane(v);
            },
            message: props => `Profane Language is not allowed`
        },
        required: [true, 'First Name required']
    },
    middleName: {
        type: String,
        validate: {
            validator: function (v) {
                return !filter.isProfane(v);
            },
            message: props => `Profane Language is not allowed`
        },
    },
    lastName: {
        type: String,
        validate: {
            validator: function (v) {
                return !filter.isProfane(v);
            },
            message: props => `Profane Language is not allowed`
        },
        required: [true, 'Last Name required']
    },
    fullName: {
        type: String,
        required: true,
    },
    trunkFullName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        validate: {
            validator: function (v) {
                return !filter.isProfane(v);
            },
            message: props => `Profane Language is not allowed`
        },
        required: [true, 'Department required']
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
