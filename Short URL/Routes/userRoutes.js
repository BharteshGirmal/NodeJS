const express = require("express");

const router = express.Router();
const { RegsiterUser, SignInUser } = require("../Controllers/userContyroller");

router.post("/", RegsiterUser);
router.post("/signin", SignInUser);
router.get("/signin", (req, res) => {
  res.render("Signin");
});

module.exports = router;
