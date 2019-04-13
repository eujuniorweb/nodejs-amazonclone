const express = require("express");

const app = express();

app.listen("3000", error => {
  if (error) throw error;
  console.log("Server online");
});

app.get("/", (req, res) => {
  res.json("Hello world");
});
