const express = require("express");
const cors = require("cors");
const path = require('path');

const {
  ServerConfig,
  DatabaseConfig,
  RabbitMQConfig,
} = require("./config/index");
const { PostRoutes, CommentRoutes } = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.send("Post server running !!!");
});

app.use("/posts", PostRoutes);
app.use("/comments", CommentRoutes);

app.listen(ServerConfig.PORT, async () => {
  try {
    await DatabaseConfig.connectDatabse();
    await RabbitMQConfig.connectQueue();
    // await RabbitMQConfig.receiveData();
  } catch (error) {
    console.log(error);
  }
  console.log(
    `Successfully started the post server on : http://localhost:${ServerConfig.PORT}`
  );
});
