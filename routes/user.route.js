const router = require("express").Router();
const Vehicle = require("../models/vehicle.model");
const User = require("../models/user.model");

// get all users

router.get("/", async (req, res) => {
    console.log("Req User", req.vehicle);
    try {
        //get all users
        let users = await User.find()
            .populate("vehicle");

        //get all vehicles
        let vehicles = await Vehicle.find();

        // console.log(vehicles);
        res.render("users/show", {
            vehicles,
            users
        });
    } catch (error) {
        console.log(error);
    }
});

/* 
  @method POST
  @route /new
  @desc creates new User
*/
router.get("/new", (req, res) => {
    res.render("users/new");
});

router.post("users/show", (req, res) => {
    console.log(req.body);

    let userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        dob: req.body.dob,
        email: req.body.dob,
        password: req.body.passsword,
        accountType: req.body.accountType,
        vehicles: req.body.vehicles,
    };

    let user = new User(userData);
    console.log(user);
    user
        .save()
        .then(() => {
            User.findById(vehicle.ownedBy).then((user) => {

                vehicle.users.push(user._id);

                vehicle.save().then(() => {
                    res.redirect("users/show");
                });
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;