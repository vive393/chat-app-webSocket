const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { join } = require("node:path");
const app = express();
const PORT = 3000;
const server = createServer(app);

const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  //receive message from client/socket
  socket.on("chat message", (msg) => {
    // console.log("message: " + msg)
    //broadcasts message to all clients/sockets
    io.emit("chat message", msg);
  });

  //user disconnect handle
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
