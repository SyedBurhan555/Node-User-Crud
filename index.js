const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const dotenv = require("dotenv");
const session = require("express-session");
const userRoutes = require("./routes/user");

dotenv.config({ path: "./config.env" });
require("./db/conn");

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "my secret Key",
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use(express.static("uploads"));
app.set("view engine", "ejs");

// routes prefix

app.use("/", userRoutes);

// port listening
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
