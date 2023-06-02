const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../model/user");
const fs = require("fs");

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

//get single-user-data
router.get("/edit/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id);

    if (user == null) {
      res.redirect("/");
    } else {
      res.render("edit_user", {
        title: "Edit User",
        user: user,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});

//update users
router.post("/update/:id", upload, async (req, res) => {
  try {
    let id = req.params.id;
    let new_image = "";
    if (req.file) {
      new_image = req.file.filename;
      try {
        fs.unlinkSync("./uploads/" + req.body.old_image);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting file.");
        return;
      }
    } else {
      new_image = req.body.old_image;
    }
    await User.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: new_image,
    });

    req.session.message = {
      type: "success",
      message: "User Updated Success",
    };
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user.");
  }
});

// delete user-data

router.get("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const user = await User.findByIdAndRemove(id);

    if (user && user.image) {
      await fs.unlinkSync("./uploads/" + user.image);
    }
    req.session.message = {
      type: "success",
      message: "User deleted successfully",
    };
    res.redirect("/");
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/add", (req, res) => {
  res.render("addUser", { title: "add User" });
});

module.exports = router;
