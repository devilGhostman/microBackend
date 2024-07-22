const { CommentService } = require("../services/index");
const { SuccessResponse, ErrorResponse } = require("../utils/index");

async function createComment(req, res, next) {
  try {
    const response = await CommentService.createComment(req);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function getComments(req, res, next) {
  try {
    const response = await CommentService.getComments(req);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function getCommentById(req, res, next) {
  try {
    const response = await CommentService.getCommentById(req.params.commentId);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function updateComment(req, res, next) {
  try {
    const response = await CommentService.updateComment(
      req.params.commentId,
      req.body
    );
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function deleteComment(req, res, next) {
  try {
    const response = await CommentService.deleteComment(req);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

module.exports = {
  createComment,
  getComments,
  getCommentById,
  updateComment,
  deleteComment,
};
