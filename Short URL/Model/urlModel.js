const mongo = require("mongoose");

const urlSchemas = mongo.Schema(
  {
    shortenID: {
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
  },
  { timestamps: true }
);

const URL = mongo.model("URL", urlSchemas);

module.exports = URL;
