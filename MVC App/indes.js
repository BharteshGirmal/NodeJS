const express = require("express");
const Users = require("./Model/userModel");
const userRouter = require("./Routes/user");
const mongo = require("mongoose");

const { generateReqResLog } = require("./Middlewares");
const { connectMongoDB } = require("./DB");

const PORT = 8000;
const app = express();

connectMongoDB()
  .then(() => {
    console.log("Conncted to MongoDB Server ");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error" + err.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(generateReqResLog("HttpReqLog.txt"));

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "GET Request from Node JS " });
});

app.listen(PORT, () => {
  console.log(`Started Node JS Server Listening on PORT: localhost:${PORT}`);
});
