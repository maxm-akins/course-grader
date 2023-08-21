const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Filter = require('bad-words'),
    filter = new Filter();

const ClassesSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: function (v) {
                return !filter.isProfane(v);
            },
            message: props => `Profane Language is not allowed`
        },
        required: [true, 'Course Name required']
    },
    trunkName: {
        type: String,
        required: false,
    },
    descripCode: {
        type: String,
        validate: {
            validator: function (v) {
                return !filter.isProfane(v);
            },
            message: props => `Profane Language is not allowed`
        },
        required: [true, 'Subject Code required']
    },
    classCode: {
        type: String,
        validate: {
            validator: function (v) {
                return !filter.isProfane(v);
            },
            message: props => `Profane Language is not allowed`
        },
        required: [true, 'Class code required']
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
