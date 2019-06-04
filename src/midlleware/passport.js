const passport = require("passport");
module.exports = passport.authenticate("local-login", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
});
