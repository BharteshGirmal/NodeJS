const cluster = require("node:cluster");
const http = require("http");
const os = require("os");

const totalCPUS = os.availableParallelism();

if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUS; i++) {
    cluster.fork();
  }
} else {
  const express = require("express");
  const app = express();
  const port = 3000;

  app.get("/", (req, res) => res.send("Hello World!"));
  app.listen(port, () =>
    console.log(
      `Server listening on port ${port}! with Cluster ID ${process.pid} 🕸️`
    )
  );
}
