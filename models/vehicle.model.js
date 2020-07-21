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
    ownedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

vehicleSchema.methods.getName = function () {
    return `CAR NUMBER: ${this.carPlate}  OWNER: ${this.ownedBy.firstname} ${this.ownedBy.lastname}`;
}

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;