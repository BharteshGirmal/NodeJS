const express = require("express");
const router = express.Router();

const URL = require("../Model/urlModel");
const {
  getShortURL,
  getURLAnalytics,
  redirectURL,
} = require("../Controllers/urlControllers");

router.post("/", getShortURL);

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allurls = await URL.find({});
  return res.render("Home", {
    urls: allurls,
  });
});

router.get("/get", async (req, res) => {
  const urls = await URL.find({});
  res.render("Home", { urls: urls });
});
router.get("/:shortid", redirectURL);
router.get("/analytics/:shortid", getURLAnalytics);

module.exports = router;
