const router = require("express").Router()
const Admin = require("../model/admin")
const jwt = require("jsonwebtoken")
const aauth = require("../middleware/adminauth")

router.get("/dashboard", aauth, (req, resp) => {
  resp.render("dashboard")
})

router.get("/admin", (req, resp) => {
  resp.render("admin_login")
})

router.post("/do_adminlogin", async (req, resp) => {
  try {

    const admin = await Admin.findOne({ uname: req.body.uname })

    if (admin.pass === req.body.pass) {
      const token = await jwt.sign({ _id: admin._id }, process.env.A_KEY)
      resp.cookie("ajwt", token)
      resp.redirect("dashboard")
    }
    else {

      resp.render("admin_login", { err: "Invalid credentials" })
    }
  } catch (error) {
    console.log(error);
    resp.render("admin_login", { err: "Invalid credentials" })
  }
})

// ---------- Admin LogOut ---------- \\

router.get("/admin_logout", aauth, async (req, res) => {
  try {

    res.clearCookie("ajwt")
    res.render("admin_login")

  } catch (error) {
    console.log(error);
  }
})


// ---------- category  ---------- \\

router.get("/category", aauth, async (req, res) => {
  
  try {
    const data = await Category.find()
    res.render("category",{catdata:data})
    
  } catch (error) {
    console.log(error);
  }
})

// ---------- Products  ---------- \\

router.get("/products", aauth, async (req, res) => {
  try {
    const data = await Category.find()
    
    res.render("products",{catdata:data})

  } catch (error) {
    console.log(error);
  }
})


// ---------- add category ---------- \\

const Category = require("../model/categories")


router.get("/category", aauth, async (req, res) => {

  try {


    res.render("category",{catdata:data})

  } catch (error) {
    console.log(error);
  }
})

router.post("/add_category", aauth, async (req, res) => {

  try {
    
    const cat = new Category(req.body)
    await cat.save()
    res.redirect("category")

  } catch (error) {
    console.log(error);
  }

})



module.exports = router