const mongo = require("mongoose");
const URL = "mongodb://127.0.0.1:27017/mvc-app";

async function connectMongoDB() {
  return mongo.connect(URL);
}

module.exports = { connectMongoDB };
