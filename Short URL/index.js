const express = require("express");
const urlRoute = require("./Routes/urlRoutes");
const userRoutes = require("./Routes/userRoutes");
const { connectMongoDB } = require("./DB");
const path = require("path");
const cookieParser = require("cookie-parser");
const { authmiddleWare } = require("./Middleware/authMiddleware");
const PORT = 8001;
const MongoURL = "mongodb://127.0.0.1:27017/short-url";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

app.get("/signup", (req, res) => {
  res.render("Signup");
});

app.get("/signin", (req, res) => {
  res.render("Signin");
});

app.use("/URL", authmiddleWare, urlRoute);
app.use("/user", userRoutes);

connectMongoDB(MongoURL)
  .then(() => {
    console.log("MongoDB Conncted");
  })
  .catch((err) => {
    console.log(`error: ${err.message}`);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on PORT : ${PORT}`);
});
