const routes = require("express").Router();
const passport = require("passport");
const passportConfig = require("../config/passport");
const User = require("../models/User");

const AuthController = require("../controllers/AuthController");
const authMidlleware = require("../midlleware/auth");
const guestMidlleware = require("../midlleware/guest");
const passportMidlleware = require("../midlleware/passport");

routes.get("/login", guestMidlleware, AuthController.create);

routes.post("/login", passportMidlleware);

routes.get("/profile", authMidlleware, function(req, res, next) {
  User.findOne({ _id: req.user._id }, function(error, user) {
    if (error) return next(error);
    res.render("./accounts/profile", { user: user });
  });
});
routes.get("/logout", AuthController.logout);
module.exports = routes;
