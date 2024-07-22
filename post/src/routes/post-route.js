const express = require("express");
const { MulterConfig } = require("../config/index");

const { PostController } = require("../controllers");
const Auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", Auth, PostController.getPosts);

router.get("/:postId", Auth, PostController.getPostById);

router.get("/user/:userId", Auth, PostController.getPostByUserId);

router.post("/create", Auth,MulterConfig.single("picturePath"), PostController.createPost);

router.put("/:postId", Auth, PostController.updatPost);

router.put("/:postId/save/:userId",Auth,PostController.savePostByUser);

router.put("/:postId/like/:userId",Auth,PostController.likePostByUser);

router.delete("/:postId", Auth, PostController.deletePost);


module.exports = router;
