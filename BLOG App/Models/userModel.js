const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { type } = require("os");
const { generateJwtToken } = require("../Service/authJwtAuthentication");
const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  profileImgURL: {
    type: String,
    default: "/Public/DefaultProfile.png",
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

userSchema.pre("save", function (next) {
  console.log(this);
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();

  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static("authCheckPassword", async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) throw new Error("User Not Exits...");
  const salt = user.salt;
  const hashedPassword = user.password;

  const userPassHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (userPassHash !== hashedPassword)
    throw new Error("Password doent matches !!!");

  const token = generateJwtToken(user);

  return user;
});
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
