const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
    schoolRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    classRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    profRef: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    addedBy: {
        type: String,
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
    private: {
        type: boolean,
        required: true,
    },

});

module.exports = mongoose.model("reviews", ReviewsSchema);
