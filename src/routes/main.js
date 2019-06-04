const express = require("express");
const routes = express.Router();
routes.get("/", (req, res) => {
  res.render("main/home");
});

routes.get("/about", (req, res) => {
  res.render("main/about");
});

module.exports = routes;
