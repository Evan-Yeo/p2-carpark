const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spaceSchema = Schema({
    spaceAllocated: {
        type: String,
        required: true,
    },
    maxSpace: {
        type: number,
        ref: "Space",
    },
    currentSpace: {
        type: number,
        ref: "Space",
    },
    occupied: {
        type: Boolean,
        default: false,
    }

});

const Space = mongoose.model("Space", spaceSchema);
module.exports = Space;