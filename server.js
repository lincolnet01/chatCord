const path = require("path");
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const formatMessage = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = "ChatBot";

//Set satic folder

app.use(express.static(path.join(__dirname, "public")));

//Run when client connect

io.on("connection", (socket) => {
  //Welcome current user
  socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

  //Broadcast when a user connects (to everyone except the connected user)
  socket.broadcast.emit(
    "message",
    formatMessage(botName, formatMessage("A user has joined the chat"))
  );

  //Broadcast when a user disconnect
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });

  //Message from client
  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
