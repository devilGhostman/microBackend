const { CommentModel } = require("../models/index");
const { HttpError } = require("../utils");

class CommentRepository {
  constructor() {
    this.model = CommentModel;
  }

  async createComment(comment) {
    try {
      const newComment = new this.model(comment);
      return await newComment.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getComments(pageNum, pageSize) {
    try {
      const comments = await this.model
        .find()
        .skip(pageNum * pageSize)
        .limit(pageSize);
      return comments;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCommentById(id) {
    try {
      const comment = await this.model.findById(id).populate("commentedOnPostId");
      return comment;
    } catch (error) {
      throw new Error(error);
    }
  }


  async updateComment(id, newComment) {
    try {
      const updatedComment = await this.model.findByIdAndUpdate(id, newComment, {
        new: true,
      });
      return updatedComment;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteComment(id) {
    try {
      const deletedComment = await this.model.findByIdAndDelete(id);
      return deletedComment;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = CommentRepository;
