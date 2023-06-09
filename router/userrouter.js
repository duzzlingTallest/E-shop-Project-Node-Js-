const router = require("express").Router(); // ?

router.get("/", (req, res) => {
  res.render("index");
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

router.get("/cart", (req, res) => {
  res.render("cart");
});

router.get("/registration", (req, res) => {
  res.render("registration");
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
