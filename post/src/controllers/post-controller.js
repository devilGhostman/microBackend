const fs = require("fs");
const { PostService } = require("../services/index");
const { SuccessResponse, ErrorResponse } = require("../utils/index");

async function createPost(req, res, next) {
  try {
    const response = await PostService.createPost(
      req.body,
      req.file.originalname,
      req.user
    );
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;

    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Failed to delete file:", err);
        }
      });
    }
    return res.status(400).json(ErrorResponse);
  }
}

async function getPosts(req, res, next) {
  try {
    const response = await PostService.getPosts(req);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function getPostById(req, res, next) {
  try {
    const response = await PostService.getPostById(req.params.postId);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function getPostByUserId(req, res, next) {
  try {
    const response = await PostService.getPostByUserId(req.params.userId);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    console.log(error);
    return res.status(400).json(ErrorResponse);
  }
}

async function savePostByUser(req, res, next) {
  try {
    const response = await PostService.savePostByUser(
      req.params.postId,
      req.params.userId,
      req.query.save
    );
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function likePostByUser(req, res, next) {
  try {
    const response = await PostService.likePostByUser(
      req.params.postId,
      req.params.userId,
    );
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function updatPost(req, res, next) {
  try {
    const response = await PostService.updatePost(req.params.postId, req.body);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function deletePost(req, res, next) {
  console.log(req.params);
  try {
    const response = await PostService.deletePost(req.params.postId);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  getPostByUserId,
  savePostByUser,
  likePostByUser,
  updatPost,
  deletePost,
};
