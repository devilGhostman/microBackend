const { MemeRepository } = require("../repositories/index");
const { HttpError } = require("../utils/index");

const memeRepository = new MemeRepository();

async function createMeme(meme, filePath) {
  try {
    const newMeme = await memeRepository.createMeme({
      ...meme,
      videoPath: filePath,
    });
    return newMeme;
  } catch (error) {
    throw new Error(error);
  }
}

async function getMemes() {
  try {
    const memes = await memeRepository.getMemes();
    return memes;
  } catch (error) {
    throw new Error(error);
  }
}

async function getMemeById(id) {
  try {
    const meme = await memeRepository.getMemeById(id);
    return meme;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateMeme(id, newMeme) {
  try {
    const updatedMeme = await memeRepository.updateMeme(id, newMeme);
    return updatedMeme;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteMeme(id) {
  try {
    const deletedMeme = await memeRepository.deleteMeme(id);
    return deletedMeme;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createMeme,
  getMemes,
  getMemeById,
  updateMeme,
  deleteMeme,
};
