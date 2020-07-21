const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spaceSchema = Schema({
    allocatedTo: {
        type: String,
        ref: "User",
    },
    isFilled: {
        type: Boolean,
        default: false,
    },

});

const Space = mongoose.model("Space", spaceSchema);
module.exports = Space;