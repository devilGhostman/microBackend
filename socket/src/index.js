const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const { ServerConfig } = require("./config/index");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200,
  },
});

const users = [{}];

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined `);
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: ` ${users[socket.id]} has joined`,
    });
    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat,${users[socket.id]} `,
    });
  });

  socket.on("message", ({ message, id, room }) => {
    if (room !== "") {
      io.to(room).emit("sendMessage", { user: users[id], message, id, room });
    } else {
      io.emit("sendMessage", { user: users[id], message, id, room });
    }
    // io.emit('sendMessage',{user:users[id],message,id,room});
  });

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("left", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]}  has left`,
    });
    console.log(`user left`);
  });
});

app.get("/", (req, res) => {
  res.send("Socket server running !!!");
});

server.listen(ServerConfig.PORT, () => {
  console.log(
    `Successfully started the Socket server on : http://localhost:${ServerConfig.PORT}`
  );
});
