const mongo = require("mongoose");

const connectMongoDB = async (url) => {
  return mongo.connect(url);
};

module.exports = { connectMongoDB };
