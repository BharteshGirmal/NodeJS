const express = require("express");
const app = express();
const path = require("path");
const uploadRoute = require("./Routes/uploadRouters");
const UploadModel = require("./Model/uploadmodel");
const mongoose = require("mongoose");

const port = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/uploadDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));
app.use("/upload", uploadRoute);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  try {
    const users = await UploadModel.find({});
    res.render("Homepage", { users });
  } catch (err) {
    console.error("Failed to fetch users:", err);
    res.render("Homepage", { users: [] });
  }
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
