const { UserModel } = require("../models/index");

class UserRepositories {
  constructor() {
    this.model = UserModel;
  }

  async createUser(user) {
    try {
      const newUser = new this.model(user);
      return await newUser.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUsers(filter) {
    try {
      const users = await this.model
        .find(filter)
        .select("userName email password")
        .lean();
      return users;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getUserById(userId) {
    const existingUser = await this.model.findById(userId);
    return existingUser;
  }

  async getUserByEmail(email) {
    const existingUser = await this.model.findOne({ email });
    return existingUser;
  }

  async getMultipleUsers() {
    const users = await this.model.findMany();
    return users;
  }

  async updateUser(userId, newUser) {
    try {
      const updatedUser = await this.model.findByIdAndUpdate(userId, newUser, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(userId) {
    try {
      const deletedPost = await this.model.findByIdAndDelete(userId);
      return deletedPost;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addFriends(userId, friendId) {
    try {
      const addedFriend = await this.model.updateOne(
        { _id: userId },
        { $addToSet: { friends: friendId } }
      );
      return addedFriend;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeFriend(userId, friendId) {
    try {
      const removedFriend = await this.model.updateOne(
        { _id: userId },
        { $pull: { friends: friendId } }
      );
      return removedFriend;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByIdWithFriends(userId) {
    try {
      const user = await this.model
        .findById(userId)
        .populate({ path: "friends" });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addPostToSaveBy(userId, data) {
    try {
      const savedPost = await this.model.updateOne(
        { _id: userId },
        { $addToSet: { savedPosts: data } }
      );
      console.log("SAVEPOST", savedPost, userId, data);
      return savedPost;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removePostFromSaveBy(userId, data) {
    try {
      const removedPost = await this.model.updateOne(
        { _id: userId },
        { $pull: { savedPosts: data } }
      );
      return removedPost;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addPostToLikes(userId, data) {
    try {
      const savedPost = await this.model.updateOne(
        { _id: userId },
        { $addToSet: { liked: data } }
      );
      return savedPost;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removePostFromLikes(userId, data) {
    try {
      const removedPost = await this.model.updateOne(
        { _id: userId },
        { $pull: { liked: data } }
      );

      return removedPost;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addComment(userId, data) {
    try {
      const addedComment = await this.model.updateOne(
        { _id: userId },
        { $push: { commented: data } }
      );
      return addedComment;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeComment(userId, data) {
    try {
      const removedComment = await this.model.updateOne(
        { _id: userId },
        { $pull: { commented: { commentid: data.commentid } } }
      );
      return removedComment;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = UserRepositories;
