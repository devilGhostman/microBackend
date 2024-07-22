const { MusicRepository } = require("../repositories/index");
const { HttpError } = require("../utils/index");

const musicRepository = new MusicRepository();

async function createMusic(music, filePath) {
  try {
    const newMusic = await musicRepository.createMusic({
      ...music,
      songPath: filePath,
    });
    return newMusic;
  } catch (error) {
    throw new Error(error);
  }
}

async function getMusics() {
  try {
    const musics = await musicRepository.getMusics();
    return musics;
  } catch (error) {
    throw new Error(error);
  }
}

async function getMusicById(id) {
  try {
    const music = await musicRepository.getMusicById(id);
    return music;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateMusic(id, neMusic) {
  try {
    const updatedMusic = await musicRepository.updateMusic(id, neMusic);
    return updatedMusic;
  } catch (error) {
    throw new Error(error);
  }
}

async function deletePost(id) {
  try {
    const deletedMusic = await musicRepository.deletePost(id);
    return deletedMusic;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createMusic,
  getMusics,
  getMusicById,
  updateMusic,
  deletePost,
};
