const passport = require("passport");
const passportConfig = require("../config/passport");

class AuthController {
  // cria uma sessão de usário logado
  create(req, res) {
    // if (req.user) return res.redirect("/");
    return res.render("./accounts/login", {
      message: req.flash("loginMessage")
    });
  }
  logout(req, res) {
    req.logout();
    res.redirect("/");
  }
}
module.exports = new AuthController();
