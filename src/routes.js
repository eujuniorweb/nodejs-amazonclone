const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/UserController");

routes.get("/", (req, res) => {
  res.render("home");
});
routes.post("/users", UserController.store);

module.exports = routes;
