const { MemeModel } = require("../models/index");

class MemeRepository {
  constructor() {
    this.model = MemeModel;
  }

  async createMeme(meme) {
    try {
      const newMeme = new this.model(meme);
      return await newMeme.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMemes() {
    try {
      const memes = await this.model.find();
      return memes;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMemeById(id) {
    try {
      const meme = await this.model.findById(id);
      return meme;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateMeme(id, newMeme) {
    try {
      const updatedMeme = await this.model.findByIdAndUpdate(id, newMeme, {
        new: true,
      });
      return updatedMeme;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteMeme(id) {
    try {
      const deletedMeme = await this.model.findByIdAndDelete(id);
      return deletedMeme;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = MemeRepository;
