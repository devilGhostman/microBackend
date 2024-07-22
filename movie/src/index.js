const express = require("express");
const cors = require("cors");
const path = require('path');

const { ServerConfig, DatabaseConfig } = require("./config/index");
const { MoviesRoutes } = require("./routes/index");

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
  res.send("Movie server running !!!");
});

app.use("/movies", MoviesRoutes);

app.listen(ServerConfig.PORT, async () => {
  await DatabaseConfig.connectDatabse();
  console.log(
    `Successfully started the movie server on : http://localhost:${ServerConfig.PORT}`
  );
});
