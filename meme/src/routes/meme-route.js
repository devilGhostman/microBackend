const express = require("express");
const { MulterConfig } = require("../config/index");

const { MemeController } = require("../controllers");
const Auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", Auth, MemeController.getMemes);

router.get("/:id", Auth, MemeController.getMemeById);

router.post("/create",Auth,MulterConfig.single("videoPath"),MemeController.createMeme);

router.put("/:id", Auth, MemeController.updateMeme);

router.delete("/:id", Auth, MemeController.deleteMeme);

module.exports = router;
