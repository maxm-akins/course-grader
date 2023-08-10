const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
        required: true,
    },
    profName: {
        type: String,
        required: true,
    },
    profRef: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: true,
    },
    term: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    profRating: {
        type: Number,
        required: true,
    },
    courseRating: {
        type: Number,
        required: true,
    },
    difficultyRating: {
        type: Number,
        required: true,
    },
    private: {
        type: Boolean,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("reviews", ReviewsSchema);
