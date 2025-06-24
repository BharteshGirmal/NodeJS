const http = require("http");
const path = require("path");
const fs = require("fs");
const express = require("express");
const { Server } = require("socket.io");

const app = express();

// Middleware to parse JSON and serve static files
app.use(express.json());
app.use(express.static(path.resolve("./Public/")));

// Create HTTP server
const myServer = http.createServer(app);

// Serve the HTML file on root route
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Public", "Socket.html"));
});

// Initialize socket.io with the HTTP server
const io = new Server(myServer);

// Handle socket connections
io.on("connection", (socket) => {
  const connectMsg = `A user connected: ${socket.id} at ${new Date()}\n`;
  fs.appendFile("Socket.io.log.txt", connectMsg, (err) => {
    if (err) console.error("Error writing connection log:", err);
  });
  console.log(connectMsg.trim());

  // Handle incoming message
  socket.on("chat message", (msg) => {
    console.log("Message:", msg);
    const logEntry = `Message Received: ${msg}\nMessage Sent: ${msg}\n`;

    fs.appendFile("Socket.io.log.txt", logEntry, (err) => {
      if (err) console.error("Error writing message log:", err);
    });

    io.emit("chat message", msg); // broadcast to all clients
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    const disconnectMsg = `User Disconnected: ${socket.id} at ${new Date()}\n`;
    fs.appendFile("Socket.io.log.txt", disconnectMsg, (err) => {
      if (err) console.error("Error writing disconnect log:", err);
    });
    console.log(disconnectMsg.trim());
  });
});

// Start server
myServer.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
