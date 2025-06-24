const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const streams = fs.createReadStream("./FileToRead.txt", "utf-8");
  streams.on("data", (chunk) => {
    res.write(chunk);
  });
  streams.on("end", () => {
    res.end();
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
