const mongo = require("mongoose");

const blogSchema = mongo.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImgURL: {
      type: String,
      required: false,
    },
    createdBy: {
      type: mongo.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const blogModel = mongo.model("blogs", blogSchema);

module.exports = blogModel;
