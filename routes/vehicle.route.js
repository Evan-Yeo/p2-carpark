const router = require("express").Router();
const Vehicle = require("../models/vehicle.model");
const User = require("../models/user.model");
// const Space = require("../models/space.model");

/* 
  @method GET
  @route /
  @desc Displays all vehicles
*/
router.get("/show", async (req, res) => {
    console.log("Req User", req.user);
    try {
        //get all vehicles
        let vehicles = await Vehicle.find()
            .populate("ownedBy");

        //get all users
        let users = await User.find();

        // console.log(vehicles);
        res.render("vehicles/show", {
            vehicles,
        });
    } catch (error) {
        console.log(error);
    }
});

/* 
  @method POST
  @route /new
  @desc creates new vehicles
*/
router.post("/new", (req, res) => {
    //   console.log(req.body);

    let vehicle = new Vehicle(req.body);
    console.log(vehicle);
    // vehicle.ownedBy = req.user._id;
    //save vehicle first
    vehicle
        .save()
        .then(() => {
            //if saved then save user
            User.findById(vehicle.ownedBy).then((user) => {
                //push into vehicles array in user model
                user.vehicles.push(vehicle._id);

                user.save().then(() => {
                    res.redirect("/vehicles/show");
                });
            });
        })
        .catch((error) => {
            console.log(error);
        });
});

router.get("/new", async (req, res) => {
    try {
        let users = await User.find();


        res.render("vehicles/new", {
            users,
        });
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;