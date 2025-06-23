const express = require("express");
const blogModel = require("../Models/blogModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../Public/BlogImg"));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const uploads = multer({ storage });
const router = express.Router();

router.get("/add-blog", (req, res) => {
  res.render("AddBlog");
});

router.post("/add-blog", uploads.single("coverImgURL"), async (req, res) => {
  try {
    console.log("Printing Values ...");
    console.log(req.body);
    console.log(req.file);

    const { title, body } = req.body;

    await blogModel.create({
      title,
      body,
      createdBy: req.user._id,
      coverImgURL: `/BlogImg/${req.file.filename}`,
    });

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).render("AddBlog", { error: "Something went wrong!" });
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params._id).populate("createdBy");
    console.log("Blogs:     " + blog);

    if (!blog) return res.status(404).render("404");

    res.render("ViewBlog", { blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).render("500");
  }
});

module.exports = router;
