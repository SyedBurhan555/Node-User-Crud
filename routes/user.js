const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // res.send("all user");
  res.render("index", { title: "home page" });
});

module.exports = router;
