const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

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
app.use(morgan("dev"));
app.listen("3000", error => {
  if (error) throw error;
  console.log("Server online");
});

app.get("/", (req, res) => {
  res.json("Hello world");
});
