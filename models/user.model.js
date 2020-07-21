const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isManagement: {
        type: Boolean,
        default: false,
        required: true,
    },
    accountType: {
        type: String,
        enum: ["Resident", "Visitor", "Security"],
        required: true,
    },
    vehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
    }, ],
});

userSchema.methods.getName = function () {
    return `${this.firstname} ${this.lastname}`;
}

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
    // bcrypt.compare(password, this.password).then((result) => {
    //   return result;
    // });
};

const User = mongoose.model("User", userSchema);
module.exports = User;