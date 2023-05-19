require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("hello node js");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
