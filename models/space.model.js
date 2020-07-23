const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spaceSchema = Schema({
    spaceNumber: {
        type: String,
        required: true,
    },
    spaceUsedBy: [{
        type: String,
        ref: "Vehicle",
    }, ],
    //     isFilled: {
    //         type: Boolean,
    //         default: false,
    //     },

});



spaceSchema.methods.getName = function () {
    return `Lot: ${this.spaceNumber}  Car Plate: ${this.spaceUsedBy.carPlate}`;
}


const Space = mongoose.model("Space", spaceSchema);
module.exports = Space;