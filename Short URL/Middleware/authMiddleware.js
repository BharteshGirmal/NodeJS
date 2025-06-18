const express = require("express");
const User = require("../Model/userModel");
const { getUser } = require("../Service/authService");

const authmiddleWare = async (req, res, next) => {
  const uuuid = req.cookies?.uid; // Fix: use req.cookies

  if (!uuuid) {
    return res.render("Signin", { error: "Invalid User" });
  }

  const user = await getUser(uuuid); // Fix: await the promise

  if (!user) {
    return res.render("Signin", { error: "User not found or session expired" });
  }

  res.user = user;
  next();
};

module.exports = { authmiddleWare };
