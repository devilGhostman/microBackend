const express = require("express");

const { CommentController } = require("../controllers");
const Auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", Auth, CommentController.getComments);

router.get("/:commentId", Auth, CommentController.getCommentById);

router.post("/create", Auth, CommentController.createComment);

router.put("/:commentId", Auth, CommentController.updateComment);

router.post("/delete", Auth, CommentController.deleteComment);

module.exports = router;
