const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const cors = require("cors");

const {
  addUser,
  removeUser,
  getAllUsersFromARoom,
  getUser,
  makeUserIsTyping
} = require("./user");
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      name,
      room,
      isTyping: false
    });
    if (error) {
      return callback(error);
    }
    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `Welcome to ${user.room}! ${user.name}`
    });
    io.to(user.room).emit("userData", {
      users: getAllUsersFromARoom(user.room)
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} joined the chat` });
  });
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", { user: user.name, text: message });
      callback();
    }
  });
  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    if (user) {
      socket.broadcast
        .to(user.room)
        .emit("message", { user: "admin", text: `${user.name} left the chat` });
      removeUser(socket.id);
    }
  });
  socket.on("isTyping", (room, boolean) => {
    makeUserIsTyping(socket.id, boolean);
    io.to(room).emit("userData", {
      users: getAllUsersFromARoom(room)
    });
  });
});

app.use("/", require("./router")); //Test reason
app.use(cors());
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`=========== PORT is starting on ${PORT} ==============`);
});
