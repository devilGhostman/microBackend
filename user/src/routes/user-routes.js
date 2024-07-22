const express = require("express");
const { MulterConfig } = require("../config/index");

const { UserController } = require("../controllers");
const UserAuth = require("../middlewares/auth");

const router = express.Router();

router.post("/register",MulterConfig.single("userProfilePic"),UserController.registerUser);

router.post("/signin", UserController.signInUser);

router.post("/getPostUsers",UserAuth,UserController.getPostusers);

router.get("/", UserAuth, UserController.getUsers);

router.get("/:id", UserAuth, UserController.getUserById);

router.put("/:id", UserAuth, UserController.updateUser);

router.delete("/:id", UserAuth, UserController.deleteUser);

router.put("/:userId/friend/:friendId", UserAuth, UserController.addRemoveFriend);

module.exports = router;
