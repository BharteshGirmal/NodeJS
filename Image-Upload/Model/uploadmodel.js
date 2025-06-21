const mongoose = require("mongoose");

const uploadSchemas = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UploadModel = mongoose.model("Uploads", uploadSchemas);

module.exports = UploadModel;
