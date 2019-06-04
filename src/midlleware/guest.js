const isGuest = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/profile");
};
module.exports = isGuest;
