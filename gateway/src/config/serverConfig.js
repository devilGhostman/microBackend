const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const serverConfigFile = `./.env.${process.env.NODE_ENV}`;
  dotenv.config({ path: serverConfigFile });
} else {
  dotenv.config();
}

module.exports = {
  PORT: process.env.PORT,
  USER_SERVICE: process.env.USER_SERVICE,
  POST_SERVICE: process.env.POST_SERVICE,
  COMMENT_SERVICE: process.env.COMMENT_SERVICE,
  MOVIE_SERVICE: process.env.MOVIE_SERVICE,
  MUSIC_SERVICE: process.env.MUSIC_SERVICE,
  MEME_SERVICE: process.env.MEME_SERVICE,
  SOCKET_SERVICE: process.env.SOCKET_SERVICE,

  USER_SERVICE_STATIC_FILES: process.env.USER_SERVICE_STATIC_FILES,
  POST_SERVICE_STATIC_FILES: process.env.POST_SERVICE_STATIC_FILES,
  MOVIE_SERVICE_STATIC_FILES: process.env.MOVIE_SERVICE_STATIC_FILES,
  MUSIC_SERVICE_STATIC_FILES: process.env.MUSIC_SERVICE_STATIC_FILES,
  MEME_SERVICE_STATIC_FILES: process.env.MEME_SERVICE_STATIC_FILES,
};
