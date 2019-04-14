const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const path = require("path");

const app = express();
// Conectando ao MongoDb
mongoose.connect(
  "mongodb+srv://developer:developer@cluster0-mclee.mongodb.net/amazonclone?retryWrites=true",
  { useNewUrlParser: true },
  error => {
    if (error) console.log(error);
    console.log("Conectado ao Mongo");
  }
);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"));
app.use(morgan("dev"));
app.engine("ejs", ejsMate);
// view engine setup
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.listen("3000", error => {
  if (error) throw error;
  console.log("Server online");
});
