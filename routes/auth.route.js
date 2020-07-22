const router = require("express").Router();
const User = require("../models/user.model");

router.get("/login", (req, res) => {
    res.render("auth/login");
});




module.exports = router;