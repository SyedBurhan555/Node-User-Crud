const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../model/user");

//save images in mutler
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

// user post req
router.post("/add", upload, async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename,
    });
    await user.save();

    req.session.message = {
      type: "success",
      message: "User added successfully",
    };

    res.redirect("/");
  } catch (err) {
    console.log({ message: err.message });
  }
});

// get all user
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.render("index", { title: "home page", users: users });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/add", (req, res) => {
  res.render("addUser", { title: "add User" });
});

module.exports = router;
