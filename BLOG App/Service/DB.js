const mongo = require("mongoose");
const connectToMongoDB = async (url) => {
  return mongo.connect(url);
};

module.exports = { connectToMongoDB };
