const express = require("express");
const { MulterConfig } = require("../config/index");

const { MovieController } = require("../controllers");
const Auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", Auth, MovieController.getMovies);

router.get("/:id", Auth, MovieController.getMovieById);

router.post("/create",Auth,MulterConfig.single("moviePath"),MovieController.createMovie);

router.put("/:id", Auth, MovieController.updateMovie);

router.delete("/:id", Auth, MovieController.deleteMovie);

module.exports = router;
