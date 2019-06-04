const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const path = require("path");
const session = require("express-session");
const cookiePaser = require("cookie-parser");
const flash = require("express-flash");
const secret = require("./config/secret");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

const app = express();
// Conectando ao MongoDb
mongoose.connect(
  secret.url,
  { useNewUrlParser: true, useCreateIndex: true },
  error => {
    if (error) console.log(error);
    console.log("Conectado ao Mongo");
  }
);
// Middleware
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiePaser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secretKey,
    store: new MongoStore({ url: secret.url, autoReconnect: true })
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(require("./routes/main"));
app.use(require("./routes/user"));
app.use(require("./routes/auth"));
app.listen(secret.port, error => {
  if (error) throw error;
  console.log("Server online");
});
