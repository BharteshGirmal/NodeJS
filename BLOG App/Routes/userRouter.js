const express = require("express");

const userModel = require("../Models/userModel");
const {
  generateJwtToken,
  validateJwtToken,
} = require("../Service/authJwtAuthentication");
const router = express.Router();

router.get("/signup", (req, res) => {
  return res.render("Signup");
});

router.get("/signin", (req, res) => {
  return res.render("Signin");
});

router.post("/signup", async (req, res) => {
  console.log(req.body);

  const { name, email, password } = req.body;

  await userModel.create({ fullName: name, email, password });
  return res.render("Homepage", { blogs: "" });
});

router.post("/signin", async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;
  try {
    const user = await userModel.authCheckPassword(email, password); // Await here
    console.log(`User : ${user}`);

    const token = generateJwtToken(user);
    return res
      .cookie("tokenCookie", token)
      .render("Homepage", { user, blogs: "" });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.render("Signin", { error: "Incorrect Email or Password !!!" });
  }
});

router.get("/logout", (req, res) => {
  console.log("Logout button clicked");

  // Clear the JWT cookie
  res.clearCookie("tokenCookie", {
    httpOnly: true,
    secure: false, // Set true in production with HTTPS
    sameSite: "lax",
  });

  // Redirect to homepage or login
  res.redirect("/");
});

module.exports = router;
