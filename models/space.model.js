const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spaceSchema = Schema({
    //     allocatedTo: {
    //         type: String,
    //         ref: "Vehicle",
    //     },
    spaceUsedBy: [{
        type: String,
        ref: "Vehicle",
    }, ],
    //     isFilled: {
    //         type: Boolean,
    //         default: false,
    //     },

});

const Space = mongoose.model("Space", spaceSchema);
module.exports = Space;