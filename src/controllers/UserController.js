const User = require("../models/User");
class UserController {
  index(req, res) {
    return res.render("./accounts/signup", {
      errors: req.flash("errors")
    });
  }

  async store(req, res) {
    const user = new User();

    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.profile.picture = user.gravatar();

    if (await User.findOne({ email: req.body.email })) {
      req.flash("errors", "O email informado já está em uso!");
      return res.redirect("/signup");
    }
    await User.create(user, (error, user) => {
      if (error) return next(error);
      req.logIn(user, error => {
        if (error) return next(error);
        res.redirect("/profile");
      });
    });
  }

  async show(req, res) {
    const user = await User.findById(req.params.id).populate({
      path: "files",
      options: { sort: { createdAt: -1 } }
    });
    return res.json(user);
  }
}
module.exports = new UserController();
