const router = require("express").Router();
const User = require("../models/user.model");



/* 
  @method GETT
  @route user/new
  @desc displays new users form
*/
router.get("/new", (req, res) => {
    res.render("users/new");
});

/* 
  @method POST
  @route user/new
  @desc creates new users
*/
router.post("/new", (req, res) => {
    let user = new User(req.body);

    user
        .save()
        .then(() => {
            res.redirect("/users/show");
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/show", async (req, res) => {
    try {
        let users = await User.find();

        res.render("users/show", {
            users
        });
    } catch (error) {
        console.log(users);
    }
});


module.exports = router;