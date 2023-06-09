const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
const hbs = require("hbs")
const mongoose = require("mongoose")
const path = require("path")

//path
const publicPath = path.join(__dirname,"../public")
const viewPath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,"../templates/partials")

// views 
app.set("view engine","hbs")
app.set("views",viewPath)

// partials
hbs.registerPartials(partialPath)
app.use(express.static(publicPath))

// require the userrouter 
app.use("/",require("../router/userrouter"))

app.listen(PORT,()=>{
    console.log("Server is Running on "+PORT);
})