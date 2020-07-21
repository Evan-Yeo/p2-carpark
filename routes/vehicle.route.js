const router = require("express").Router();
const Vehicle = require("../models/vehicle.model");
const User = require("../models/user.model");
const Space = require("../models/space.model");

/* 
  @method GET
  @route /
  @desc Displays all users and vehicles
*/
router.get("/", async (req, res) => {
    console.log("Req User", req.user);
    try {
        //get all vehicles
        let vehicles = await Vehicle.find()
            .populate("ownedBy")
            .populate("user");

        //get all users
        let users = await User.find();

        // console.log(vehicles);
        res.render("vehicles/index", {
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
  @desc creates new vehicles
*/
router.post("/new", (req, res) => {
    //   console.log(req.body);

    let vehicle = new Vehicle(req.body);
    console.log(vehicle);
    vehicle.ownedBy = req.user._id;
    //save vehicle first
    vehicle
        .save()
        .then(() => {
            //vehicle : { _id: , ownedBy: , name : ,}
            //if saved then save user
            User.findById(vehicle.ownedBy).then((user) => {
                //push into vehicles array in user model
                user.vehicles.push(vehicle._id);

                user.save().then(() => {
                    res.redirect("vehicles/show");
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

router.get("/show/:id", async (req, res) => {
    try {
        //Populate only includes the data from  user collection and ownedBy collection
        let vehicle = await Vehicle.findById(req.params.id)
            .populate("user")
            .populate("ownedBy");

        res.render("vehicles/show", {
            vehicle
        });
    } catch (error) {
        console.log(error);
    }
    //   Vehicle.findById(req.params.id)
    //     .populate("ownedBy")
    //     .then((vehicle) => {
    //       res.send(vehicle);
    //     });

    //   Vehicle.findById(req.params.id).then((vehicle) => {
    //     User.findById(vehicle.ownedBy).then((user) => {
    //       res.send(vehicle, user);
    //     });
    //   });
});

router.get("/edit/:id", async (req, res) => {
    try {
        //Populate only includes the data from  user collection and ownedBy collection
        let vehicle = await Vehicle.findById(req.params.id)
            .populate("user")
            .populate("ownedBy");
        let users = await User.find();

        res.render("vehicles/edit", {
            vehicle,
            users,
            users
        });
    } catch (error) {
        console.log(error);
    }
});

router.post("/edit/:id", async (req, res) => {
    try {
        let updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body);
        if (updated) {
            return res.redirect("/");
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;