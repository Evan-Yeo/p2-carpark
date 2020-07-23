const router = require("express").Router();
const Space = require("../models/space.model");


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
        let spaces = await Space.find();

        res.render("spaces/show", {
            spaces
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;