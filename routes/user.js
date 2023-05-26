const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // res.send("all user");
  res.render("index", { title: "home page" });
});

router.get("/add", (req, res) => {
  res.render("addUser", { title: "add User" });
});

module.exports = router;
