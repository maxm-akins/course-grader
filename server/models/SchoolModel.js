const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const short = require('short-uuid');
var Filter = require('bad-words'),
    filter = new Filter();



const SchoolsSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: function (v) {
                return !filter.isProfane(v);
            },
            message: props => `Profane Language is not allowed`
        },
        required: [true, 'Name required']
    },
    trunkName: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        validate: {
            validator: function (v) {
                return !filter.isProfane(v);
            },
            message: props => `Profane Language is not allowed`
        },
        required: [true, 'City required']
    },
    state: {
        type: String,
        validate: {
            validator: function (v) {
                return !filter.isProfane(v);
            },
            message: props => `Profane Language is not allowed`
        },
        required: [true, 'State required']
    },
    rating: {
        type: String,
        required: false,
        default: "n/a"
    },
    prevRating: {
        type: String,
    },
    departments: {
        type: Array,
        required: true,
        default: [],
    },
    trunkDepartments: {
        type: Array,
        required: true,
        default: [],
    },
    uuid: {
        type: String,
        default: short.generate(),
        required: true
    },
    uuid: {
        type: String,
        default: short.generate(),
        required: true
    },
    user: {
        type: String,
    }

});

module.exports = mongoose.model("schools", SchoolsSchema);
