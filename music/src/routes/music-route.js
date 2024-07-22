const express = require("express");
const { MulterConfig } = require("../config/index");

const { MusicController } = require("../controllers");
const Auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", Auth, MusicController.getMusics);

router.get("/:id", Auth, MusicController.getMusicById);

router.post("/create",Auth,MulterConfig.single("songPath"),MusicController.createMusic);

router.put("/:id", Auth, MusicController.updateMusic);

router.delete("/:id", Auth, MusicController.deleteMusic);

module.exports = router;
