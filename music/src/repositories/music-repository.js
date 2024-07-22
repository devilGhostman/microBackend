const { MusicModel } = require("../models/index");

class MusicRepository {
  constructor() {
    this.model = MusicModel;
  }

  async createMusic(music) {
    try {
      const newMusic = new this.model(music);
      return await newMusic.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMusics() {
    try {
      const musics = await this.model.find();
      return musics;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMusicById(id) {
    try {
      const music = await this.model.findById(id);
      return music;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateMusic(id, newMusic) {
    try {
      const updatedMusic = await this.model.findByIdAndUpdate(id, newMusic, {
        new: true,
      });
      return updatedMusic;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteMusic(id) {
    try {
      const deletedMusic = await this.model.findByIdAndDelete(id);
      return deletedMusic;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = MusicRepository;
