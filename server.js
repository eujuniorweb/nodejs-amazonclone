const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(morgan("dev"));
app.listen("3000", error => {
  if (error) throw error;
  console.log("Server online");
});

app.get("/", (req, res) => {
  res.json("Hello world");
});
