const http = require("http");
const fs = require("fs");
const myOS = require("os");

const customServer = http.createServer((req, res) => {
  const log = `New Request has been fired from ${
    myOS.hostname
  } with endpoint ${req.url} at ${new Date()}\n`;
  fs.appendFile("Httplog.txt", log, (err, msg) => {
    if (err) {
      console.log(err.message);
    } else {
      res.end(`Http Server Example !!!\n`);
    }
  });
});

console.log("Http Server Example !!!");

customServer.listen(8000, () => {
  console.log("Port is now listening at Port 8000");
});
