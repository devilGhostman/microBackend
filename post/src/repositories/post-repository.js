const { PostModel } = require("../models/index");
const { HttpError } = require("../utils");

class PostRepository {
  constructor() {
    this.model = PostModel;
  }

  async createPost(post) {
    try {
      const newPost = new this.model(post);
      return await newPost.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPosts(pageNum, pageSize) {
    try {
      const posts = await this.model
        .find()
        .skip(pageNum * pageSize)
        .limit(pageSize)
        .populate("comments");
      return posts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPostById(id) {
    try {
      const post = await this.model.findById(id).populate("comments");
      return post;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getPostByUserId(id) {
    try {
      const userPost = await this.model.find({ userId: id });
      return userPost;
    } catch (error) {
      throw new Error(error);
    }
  }

  async savePostByUser(postId, userId) {
    try {
      const savedPost = await this.model.updateOne(
        { _id: postId },
        { $addToSet: { savedBy: userId } }
      );
      return savedPost;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeSavedPostByUser(postId, userId) {
    try {
      const removedPost = await this.model.updateOne(
        { _id: postId },
        { $pull: { savedBy: userId } }
      );
      return removedPost;
    } catch (error) {
      throw new Error(error);
    }
  }

  async likePost(postId, userId) {
    try {
      const likedPost = await this.model.updateOne(
        { _id: postId },
        { $addToSet: { likes: userId } }
      );
      return likedPost;
    } catch (error) {
      throw new Error(error);
    }
  }

  async unlikePost(postId, userId) {
    try {
      const unlikedPost = await this.model.updateOne(
        { _id: postId },
        { $pull: { likes: userId } }
      );
      return unlikedPost;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updatePost(id, newPost) {
    try {
      const updatedPost = await this.model.findByIdAndUpdate(id, newPost, {
        new: true,
      });
      return updatedPost;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletePost(id) {
    try {
      const deletedPost = await this.model.findByIdAndDelete(id);
      return deletedPost;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addComment(postId, commentId) {
    try {
      const updatedPost = await this.model.updateOne(
        { _id: postId },
        { $push: { comments: commentId } }
      );
      return updatedPost;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeComment(postId, commentId) {
    try {
      const updatedPost = await this.model.updateOne(
        { _id: postId },
        { $pull: { comments: commentId } }
      );
      return updatedPost;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = PostRepository;
