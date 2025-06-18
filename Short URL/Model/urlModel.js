const { default: mongoose } = require("mongoose");
const mongo = require("mongoose");

const urlSchemas = mongo.Schema(
  {
    shortID: {
      type: String,
      required: true,
      unique: true,
    },
    URL: {
      type: String,
      required: true,
    },
    visitedHistory: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const URL = mongo.model("URL", urlSchemas);

module.exports = URL;
