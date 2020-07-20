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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;