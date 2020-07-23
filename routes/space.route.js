const router = require("express").Router();
const Space = require("../models/space.model");
const Vehicle = require("../models/vehicle.model");
const User = require("../models/user.model");


// router.get("/spaces", (req, res) => {
//     res.render("spaces/show");
// });



/* 
  @method GETT
  @route spaces/new
  @desc displays new spaces form
*/
router.get("/new", (req, res) => {
    res.render("spaces/new");
});

/* 
  @method POST
  @route spaces/new
  @desc creates new spaces
*/
router.post("/new", (req, res) => {
    let space = new Space(req.body);

    space
        .save()
        .then(() => {
            res.redirect("/spaces");
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/", async (req, res) => {
    try {
        //get all spaces
        let spaces = await Space.find()
            .populate("spaceUsedBy");

        //get all users
        let users = await User.find();

        //get all vehicles
        let vehicles = await Vehicle.find();

        res.render("spaces/show", {
            spaces,
            users,
            vehicles
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;