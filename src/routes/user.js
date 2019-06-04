const routes = require("express").Router();

const UserController = require("../controllers/UserController");
const guestMidlleware = require("../midlleware/guest");
routes.get("/signup", guestMidlleware, UserController.index);
routes.post("/signup", UserController.store);

module.exports = routes;
