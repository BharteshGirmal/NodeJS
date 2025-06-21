// middleware/uploadMiddleware.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const uploadmiddleware = multer({ storage });

module.exports = { uploadmiddleware };
