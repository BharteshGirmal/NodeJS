const http = require("http");
const fs = require("fs");
const myOS = require("os");
const URL = require("url");

const customServer = http.createServer((req, res) => {
  const myurl = URL.parse(req.url);
  // console.log(myurl);

  const log = `\nNew Request has been fired from ${
    myOS.hostname
  } with endpoint ${req.method} |  ${
    req.url
  } at ${new Date()}\n and URL Data : ${myurl}`;
  fs.appendFile("Httplog.txt", log, (err, msg) => {
    if (err) {
      res.end(err.message);
    } else {
      switch (myurl.pathname) {
        case "/home":
          res.end(`Welcome to Http Sever example ${myOS.hostname} `);
          break;
        default:
          res.end(`Http Server Example !!!\nURL Data : ${err}\n`);
      }
    }
  });
});

// console.log("Http Server Example !!!");
// customServer.listen(8000, () => {
//   console.log("Port is now listening at Port 8000");
// });

// now using express JS

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(201).json({ message: "Server has been started" });
});

app.get("/about", (req, res) => {
  res
    .status(201)
    .json({ message: "Server has been started redirected to about page" });
});
app.post("/", () => {});
app.put("/", () => {});
app.delete("/", () => {});

app.listen(8000, () => {
  console.log("Port is now listening at Port 8000");
});
