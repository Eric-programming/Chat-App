const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const {
  addUser,
  removeUser,
  getAllUsersFromARoom,
  getUser
} = require("./user");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
  console.log("/////////Welcome to the Chat!");
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    }
    socket.join(user.room);
    socket.emit("message", {
      user: "admin",
      text: `Welcome to ${user.room} Chat Room, ${user.name}`
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} joined the chat` });
  });
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });
  socket.on("disconnect", () => {
    console.log("You left the Chat Room//////////");
  });
});

app.use("/", require("./router"));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`=========== PORT is starting on ${PORT} ==============`);
});
