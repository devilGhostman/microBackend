const fs = require("fs");
const axios = require("axios");
const { RabbitMQConfig } = require("../config");
const { HttpError, POST_ACTION } = require("../utils/index");
const { PostRepository } = require("../repositories/index");
const serverConfig = require("../config/serverConfig");

const postRepository = new PostRepository();

async function createPost(post, filePath, user) {
  try {
    const newPost = await postRepository.createPost({
      ...post,
      picturePath: filePath,
      userId: user._id,
      username: user.username,
      userPicturePath: user.picturePath,
    });
    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

async function getPosts(req) {
  try {
    const signature = req.get("Authorization").split(" ")[1];
    const pageNum = req.query?.pageNum ? +req.query?.pageNum : 0;
    const pageSize = req.query?.pageSize ? +req.query?.pageSize : 10;

    const toPopulate = {
      userId: [],
      likes: [],
      savedBy: [],
    };

    const posts = await postRepository.getPosts(pageNum, pageSize);

    posts.forEach((post) => {
      toPopulate.userId.push(post.userId);
      toPopulate.likes.push(post.likes);
      toPopulate.savedBy.push(post.savedBy);
    });

    let populatedData = await axios.post(
      `${serverConfig.USER_SERVICE_URL}/getPostUsers`,
      toPopulate,
      {
        headers: {
          Authorization: `Bearer ${signature}`,
        },
      }
    );

    let postsWithUser = posts.map((post, index) => {
      return {
        ...post.toJSON(),
        ...{ user: populatedData.data.data.userId[index] },
        ...{ likesData: populatedData.data.data.likes[index] },
        ...{ savedByData: populatedData.data.data.savedBy[index] },
      };
    });

    return postsWithUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function getPostById(id) {
  try {
    const post = await postRepository.getPostById(id);
    return post;
  } catch (error) {
    throw new Error(error);
  }
}

async function getPostByUserId(id) {
  try {
    const post = await postRepository.getPostByUserId(id);
    return post;
  } catch (error) {
    throw new Error(error);
  }
}

async function savePostByUser(postId, userId, save) {
  try {
    const post = await postRepository.getPostById(postId);
    if (!post) {
      throw new Error("Post not found");
    }

    if (!post.savedBy.includes(userId)) {
      const savedPost = await postRepository.savePostByUser(postId, userId);

      const updatedPost = await postRepository.getPostById(postId);
      const savePostData = {
        data: {
          postid: updatedPost._id,
          postTitle: updatedPost.title,
          postPic: updatedPost.picturePath,
        },
        userId: userId,
        action: POST_ACTION.ADD_POST_TO_SAVE,
      };
      RabbitMQConfig.sendData(savePostData);

      return savedPost;
    } else {
      const removedPost = await postRepository.removeSavedPostByUser(
        postId,
        userId
      );

      const updatedPost = await postRepository.getPostById(postId);
      const savePostData = {
        data: {
          postid: updatedPost._id,
          postTitle: updatedPost.title,
          postPic: updatedPost.picturePath,
        },
        userId: userId,
        action: POST_ACTION.REMOVE_POST_FROM_SAVE,
      };
      RabbitMQConfig.sendData(savePostData);
      return removedPost;
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function likePostByUser(postId, userId) {
  try {
    if (!postId || !userId) {
      throw new HttpError("Invalid request", 400);
    }

    const post = await postRepository.getPostById(postId);

    if (!post.likes.includes(userId)) {
      const likedPost = await postRepository.likePost(postId, userId);

      const likedPostData = {
        data: {
          postid: post._id,
          postTitle: post.title,
          postPic: post.picturePath,
        },
        userId: userId,
        action: POST_ACTION.ADD_POST_TO_LIKE,
      };
      RabbitMQConfig.sendData(likedPostData);

      return likedPost;
    } else {
      const unlikedPost = await postRepository.unlikePost(postId, userId);

      const unlikedPostData = {
        data: {
          postid: post._id,
          postTitle: post.title,
          postPic: post.picturePath,
        },
        userId: userId,
        action: POST_ACTION.REMOVE_POST_FROM_LIKE,
      };
      RabbitMQConfig.sendData(unlikedPostData);

      return unlikedPost;
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function updatePost(id, newPost) {
  try {
    const updatedPost = await postRepository.updatePost(id, newPost);
    return updatedPost;
  } catch (error) {
    throw new Error(error);
  }
}

async function deletePost(id) {
  try {
    const post = await postRepository.getPostById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    console.log(post.picturePath);
    if (post.picturePath) {
      fs.unlink(post.picturePath, (err) => {
        if (err) {
          console.error("Failed to delete file:", err);
        }
      });
    }
    const deletedPost = await postRepository.deletePost(id);
    return deletedPost;
  } catch (error) {
    throw new Error(error);
  }
}

async function addComment(postId, commentId) {
  try {
    const updatedPost = await postRepository.addComment(postId, commentId);
    return updatedPost;
  } catch (error) {
    throw new Error(error);
  }
}

async function removeComment(postId, commentId) {
  try {
    const updatedPost = await postRepository.removeComment(postId, commentId);
    return updatedPost;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createPost,
  getPosts,
  getPostById,
  getPostByUserId,
  savePostByUser,
  likePostByUser,
  updatePost,
  deletePost,
  addComment,
  removeComment,
};
