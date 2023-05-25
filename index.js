const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const userRoutes = require("./routes/user");

dotenv.config({ path: "./config.env" });
require("./db/conn");

//middlewears

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "my serect Key",
    saveUninitialized: true,
    resave: false,
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// routes prefix

app.get("/", (req, res) => {
  res.send("hello node js");
});

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
