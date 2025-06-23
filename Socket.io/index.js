const http = require("http");
const path = require("path");
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
  console.log("A user connected:", socket.id);

  // Example: handle incoming message
  socket.on("chat message", (msg) => {
    console.log("Message:", msg);
    io.emit("chat message", msg); // broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
myServer.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
