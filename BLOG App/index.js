require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/userRouter");
const blogRoutes = require("./Routes/blogRoutes");
const blogModel = require("./Models/blogModel");
const { connectToMongoDB } = require("./Service/DB");
const { authenticateCookieValue } = require("./Service/authCheckCookie");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("Public")));

app.use(cookieParser());
app.use(authenticateCookieValue);
app.use("/user", userRoutes);
app.use("/blogs", blogRoutes);
app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));
const port = 3000;
const mongoURL = "mongodb://127.0.0.1:27017/BlogSite";
connectToMongoDB(mongoURL)
  .then(() => {
    console.log("Connected To MongoDB Server");
  })
  .catch((err) => {
    console.log(
      `Something went wrong while connecting to MongoDB ${err.message}`
    );
  });

app.get("/", async (req, res) => {
  try {
    console.log("Printing User Details ...");
    console.log(req.user);

    const allBlogs = await blogModel.find({}).sort({ createdAt: -1 }); // recent first

    console.log(allBlogs);

    res.render("Homepage", {
      user: req.user,
      blogs: allBlogs,
    });
  } catch (error) {
    console.error("Error loading homepage:", error);
    res.status(500).render("Homepage", {
      user: req.user,
      blogs: [],
      error: "Failed to load blogs. Please try again later.",
    });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
