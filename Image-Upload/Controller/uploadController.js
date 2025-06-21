// Controller/uploadController.js
const UploadModel = require("../Model/uploadmodel");

const uploadUserDetails = async (req, res) => {
  try {
    const { name, email, contact } = req.body;

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const newUser = await UploadModel.create({
      name,
      email,
      contact,
      profileImage: req.file.path, // Correct path usage
    });

    res.redirect("/");
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).send("Error uploading data");
  }
};

const getAllDetails = async (req, res) => {
  try {
    const users = await UploadModel.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching users");
  }
};

module.exports = { uploadUserDetails, getAllDetails };
