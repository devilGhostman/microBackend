const { RabbitMQConfig } = require("../config");
const { HttpError, COMMENT_ACTION } = require("../utils/index");
const { CommentRepository, PostRepository } = require("../repositories/index");

const commentRepository = new CommentRepository();
const postRepository = new PostRepository();

async function createComment(req) {
  try {
    const post = await postRepository.getPostById(req.body.commentedOnPostId);
    if (!post) {
      throw new HttpError("Post not found", 404);
    }
    const newComment = await commentRepository.createComment({
      ...req.body,
    });
    await postRepository.addComment(post._id, newComment._id);

    const userNewCommentData = {
      data: {
        postid: post._id,
        postTitle: post.title,
        postPic: post.picturePath,
        comment: newComment.comment,
        commentid: newComment._id,
      },
      userId: newComment.commentedbyId,
      action: COMMENT_ACTION.ADD_COMMENT,
    };
    RabbitMQConfig.sendData(userNewCommentData);

    return newComment;
  } catch (error) {
    throw new Error(error);
  }
}

async function getComments(req) {
  try {
    const pageNum = req.query?.pageNum ? +req.query?.pageNum : 0;
    const pageSize = req.query?.pageSize ? +req.query?.pageSize : 10;
    const comments = await commentRepository.getComments(pageNum, pageSize);

    return comments;
  } catch (error) {
    throw new Error(error);
  }
}

async function getCommentById(id) {
  try {
    const comment = await commentRepository.getCommentById(id);
    return comment;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateComment(id, newComment) {
  try {
    const updatedComment = await commentRepository.updateComment(
      id,
      newComment
    );
    return updatedComment;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteComment(req) {
  try {
    const deletedComment = await commentRepository.deleteComment(
      req.body.commentId
    );
    await postRepository.removeComment(req.body.postId, req.body.commentId);

    const userDeleteComment = {
      data: { commentid: req.body.commentId },
      userId: req.body.userId,
      action: COMMENT_ACTION.REMOVE_COMMENT,
    };
    RabbitMQConfig.sendData(userDeleteComment);

    return deletedComment;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
};
