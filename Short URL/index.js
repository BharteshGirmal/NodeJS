const express = require("express");
const urlRoute = require("./Routes/urlRoutes");
const { connectMongoDB } = require("./DB");
const path = require("path");
const PORT = 8001;
const MongoURL = "mongodb://127.0.0.1:27017/short-url";

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));
app.use("/URL", urlRoute);
connectMongoDB(MongoURL)
  .then(() => {
    console.log("MongoDB Conncted");
  })
  .catch((err) => {
    console.log(`error: ${err.message}`);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on PORT : ${PORT}`);
});
