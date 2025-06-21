const mongo = require("mongoose");

const User = require("../Model/userModel");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../Service/authService");
const URL = require("../Model/urlModel");
const { setJwtToken } = require("../Middleware/auth_JWT_Middleware");
const RegsiterUser = async (req, res) => {
  console.log("Request body:", req.body);
  const user = req.body;
  if (!user)
    return res.render("Signup", {
      error: "Username and password required ...",
    });

  const { name, email, password } = req.body;

  const result = await User.create({ name, email, password });

  return res.render("Signin");
};

const SignInUser = async (req, res) => {
  const user = req.body;
  if (!user)
    return res.render("Signup", {
      error: "Username and password required ...",
    });

  const { email, password } = req.body;

  const result = await User.findOne({ email, password });

  //1. For StateFull Authntication using session uuid
  const sessionID = uuidv4();
  setUser(sessionID, email);
  res.cookie("uid", sessionID);

  //1. For StateLess Authntication using JWT Token

  // const token = setJwtToken(user);

  // res.cookie("uid", token);
  const resultUrls = await URL.find({});

  return res.render("Home", { urls: resultUrls });
};

module.exports = { RegsiterUser, SignInUser };
