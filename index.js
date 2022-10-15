
const express = require("express");
const cors = require("cors");
const app = express();
const httpLogger = require('./httplogger');

app.use(cors());
app.use(express.json());

app.use(httpLogger);
app.use(cors());
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  try {
    return res.send("Welcome to Aume");
  } catch (err) {
    console.log(err);
  }
});

module.exports = app;
