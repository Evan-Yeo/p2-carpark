// const router = require("express").Router();
// const Space = require("../models/space.model");

// router.get("/", async (req, res) => {
//     try {
//         let spaces = await space.find();

//         res.render("spaces/index", {
//             spaces
//         });
//     } catch (error) {
//         console.log(spaces);
//     }
// });

// router.get("/:id", (req, res) => {
//     Space.findById(req.params.id)
//         .populate("spaces")
//         .then((space) => {
//             res.send(space);
//         });
// });

// module.exports = router;