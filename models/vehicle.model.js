const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = Schema({
    vehType: {
        type: String,
        required: true,
    },
    vehColor: {
        type: String,
        required: true,
    },
    carPlate: {
        type: String,
        required: true,
    },
    space: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space",
    }, ],
    ownedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});


const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;