const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const app = express();
// const passport = require("./lib/passportConfig");
const session = require("express-session");
// const flash = require("connect-flash");
// const checkUser = require("./lib/blockCheck");
require("dotenv").config();

/* 
===================
Connect to MongoDB 
*/
mongoose.connect(
    process.env.MONGODBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    () => {
        console.log("MongoDB connected!");
    }
);

app.use(express.static("public")); //look for static files in public folder
app.use(express.urlencoded({
    extended: true
})); //collects form data
app.set("view engine", "ejs"); //view engine setup
app.use(expressLayouts); //Express EJS layout to make views into block

//must come after above middleware and before routes
//this creates a session which determines how long
//communication will last
// app.use(
//     session({
//         secret: process.env.SECRET,
//         saveUninitialized: true,
//         resave: false,
//         cookie: {
//             maxAge: 360000
//         },
//     })
// );

//must be after sessions
//passport initialization
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
//set global variable for ejs files
//third param is mostly called next (moveOn)
// app.use(function (req, res, moveOn) {
//     res.locals.alerts = req.flash();
//     res.locals.currentUser = req.user;
//     moveOn();
// });
//all routes
app.use("/users", require("./routes/user.route"));
app.use("/vehicles", require("./routes/vehicle.route"));
app.use("/auth", require("./routes/auth.route"));
app.use("/spaces", require("./routes/space.route"));

//connect to port
app.listen(process.env.PORT, () => {
    console.log(`running on PORT ${process.env.PORT}`);
});