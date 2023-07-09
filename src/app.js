const { log, error } = require("console");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const hbs = require("hbs");
const mongoose = require("mongoose");
const path = require("path");

// cookieParser
var cookieParser = require('cookie-parser')
app.use(cookieParser())

// body parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
 
// Connection With DB

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB is Connected.... ");
  })
  .catch((err) => {
    console.log(err);
  });

//path
const publicPath = path.join(__dirname, "../public");

const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// views
app.set("view engine", "hbs");
app.set("views", viewPath);

// partials
hbs.registerPartials(partialPath);
app.use(express.static(publicPath));  // static consider CSS and all

// require the userrouter
app.use("/", require("../router/userrouter"));

// require the adminrouter (configure)
app.use("/",require("../router/adminrouter"))

app.listen(PORT, () => {
  console.log("Server is Running on " + PORT);
});
