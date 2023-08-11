const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const short = require('short-uuid');




const SchoolsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    trunkName: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
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
    website: {
        type: String,
    },
    uuid: {
        type: String,
        default: short.generate(),
        required: true
    }

});

module.exports = mongoose.model("schools", SchoolsSchema);
