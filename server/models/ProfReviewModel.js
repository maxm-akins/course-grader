const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Filter = require('bad-words'),
    filter = new Filter();

const ReviewsSchema = new Schema({
    schoolRef: {
        type: String,
        required: true,
    },
    courseRef: {
        type: String,
        required: true,
    },
    userRef: {
        type: String,
        required: false,
    },
    profRef: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        validate: {
            validator: function (v) {
                return !filter.isProfane(v);
            },
            message: props => `Profane Language is not allowed`
        },
        required: [true, 'Desription required']
    },
    date: {
        type: Date,
        required: true,
    },
    term: {
        type: String,
        validate: {
            validator: function (v) {
                return !filter.isProfane(v);
            },
            message: props => `Profane Language is not allowed`
        },
        required: [true, 'Term required']
    },
    year: {
        type: String,
        validate: {
            validator: function (v) {
                return !filter.isProfane(v);
            },
            message: props => `Profane Language is not allowed`
        },
        required: [true, 'Year required']
    },
    overallRating: {
        type: Number,
        required: true,
    },
    difficultyRating: {
        type: Number,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: false,
    },
    reviewed: {
        type: Boolean,
        required: true,
        default: false
    }

});

module.exports = mongoose.model("reviews", ReviewsSchema);
