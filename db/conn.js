const mongoose = require("mongoose");
require("dotenv").config();
const DB = process.env.DB;

mongoose
  .connect(DB, {})
  .then(() => console.log("Connection successfully"))
  .catch((err) => console.log(err));
