const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { ServerConfig } = require("./config/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// STATIC FILES
app.use(
  "/users/static",
  createProxyMiddleware({
    target: ServerConfig.USER_SERVICE_STATIC_FILES,
    changeOrigin: true,
    pathRewrite: {
      "^/users/static": "/static",
    },
    logger: console,
  })
);
app.use(
  "/posts/static",
  createProxyMiddleware({
    target: ServerConfig.POST_SERVICE_STATIC_FILES,
    changeOrigin: true,
    pathRewrite: {
      "^/posts/static": "/static",
    },
    logger: console,
  })
);
app.use(
  "/movies/static",
  createProxyMiddleware({
    target: ServerConfig.MOVIE_SERVICE_STATIC_FILES,
    changeOrigin: true,
    pathRewrite: {
      "^/movies/static": "/static",
    },
    logger: console,
  })
);
app.use(
  "/musics/static",
  createProxyMiddleware({
    target: ServerConfig.MUSIC_SERVICE_STATIC_FILES,
    changeOrigin: true,
    pathRewrite: {
      "^/musics/static": "/static",
    },
    logger: console,
  })
);
app.use(
  "/memes/static",
  createProxyMiddleware({
    target: ServerConfig.MEME_SERVICE_STATIC_FILES,
    changeOrigin: true,
    pathRewrite: {
      "^/mmes/static": "/static",
    },
    logger: console,
  })
);

// SERVICES ENDPOINTS
app.use(
  "/users",
  createProxyMiddleware({
    target: ServerConfig.USER_SERVICE,
    changeOrigin: true,
    logger: console,
  })
);
app.use(
  "/posts",
  createProxyMiddleware({
    target: ServerConfig.POST_SERVICE,
    changeOrigin: true,
    logger: console,
  })
);
app.use(
  "/comments",
  createProxyMiddleware({
    target: ServerConfig.COMMENT_SERVICE,
    changeOrigin: true,
    logger: console,
  })
);
app.use(
  "/movies",
  createProxyMiddleware({
    target: ServerConfig.MOVIE_SERVICE,
    changeOrigin: true,
    logger: console,
  })
);
app.use(
  "/musics",
  createProxyMiddleware({
    target: ServerConfig.MUSIC_SERVICE,
    changeOrigin: true,
    logger: console,
  })
);
app.use(
  "/memes",
  createProxyMiddleware({
    target: ServerConfig.MEME_SERVICE,
    changeOrigin: true,
    logger: console,
  })
);

app.use(
  "/socket",
  createProxyMiddleware({
    target: ServerConfig.SOCKET_SERVICE,
    changeOrigin: true,
    logger: console,
  })
);

app.get("/", (req, res) => {
  res.send("Gateway server running !!!");
});

app.listen(ServerConfig.PORT, () => {
  console.log(
    `Successfully started the Gateway server on PORT : ${ServerConfig.PORT}`
  );
});
