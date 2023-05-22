const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello node js");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
