const router = require("express").Router(); // ?
const auth = require("../middleware/auth")
const Category = require("../model/categories")

router.get("/", async  (req, res) => {
  const data = await Category.find()  // it's carry Category Data
  res.render("index",{catdata:data});
});

router.get("/shop", (req, res) => {
  res.render("shop");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/cart", auth, (req, res) => {
  const user = req.user  // this for welcome, name 
  res.render("cart", { currentuser: user.uname });
});

router.get("/registration", (req, res) => {
  res.render("registration");
});

router.get("/login", (req, res) => {
  res.render("login");
});

const bodyParser = require("body-parser");

// User Registration
const User = require("../model/users");


router.post("/do_register", async (req, res) => {

  try {
    // console.log(req.body);
    const user = new User(req.body);
    await user.save();
    res.render("registration", { msg: "Registration Successfully...." });
  } catch (error) {
    console.log(error);
  }
});

// User Login / token

const bcrypt = require("bcryptjs")  // for compare the password 
const jwt = require("jsonwebtoken")

router.post("/do_login", async (req, res) => {

  try {

    const user = await User.findOne({ email: req.body.email })
    console.log(user);
    const isMatch = await bcrypt.compare(req.body.pass, user.pass)

    console.log(isMatch);

    if (isMatch) {

      const token = await jwt.sign({ _id: user._id }, process.env.S_KEY)
      res.cookie("jwt", token)  // stored data into cookie
      res.render("index", { currentuser: user.uname })

    } else {

      res.render("login", { err: "Invalid Credantials !!!" })

    }

  } catch (error) {
    res.render("login", { err: "Invalid Credantials !!!" })
  }

})


module.exports = router;
