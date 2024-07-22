const { MusicService } = require("../services/index");
const { successResponse, errorResponse } = require("../utils/index");
const fs = require("fs");

async function createMusic(req, res, next) {
  try {
    const response = await MusicService.createMusic(req.body,req.file.originalname);
    successResponse.data = response;
    return res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error.message;

    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Failed to delete file:", err);
        }
      });
    }
    
    return res.status(400).json(errorResponse);
  }
}

async function getMusics(req, res, next) {
  try {
    const response = await MusicService.getMusics();
    successResponse.data = response;
    return res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error.message;
    return res.status(400).json(errorResponse);
  }
}

async function getMusicById(req, res, next) {
  try {
    const response = await MusicService.getMusicById(req.params.id);
    successResponse.data = response;
    return res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error.message;
    return res.status(400).json(errorResponse);
  }
}

async function updateMusic(req, res, next) {
  try {
    const response = await MusicService.updateMusic(req.params.id, req.body);
    successResponse.data = response;
    return res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error.message;
    return res.status(400).json(errorResponse);
  }
}

async function deleteMusic(req, res, next) {
  try {
    const response = await MusicService.deleteMusic(req.params.id);
    successResponse.data = response;
    return res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error.message;
    return res.status(400).json(errorResponse);
  }
}

module.exports = {
  createMusic,
  getMusics,
  getMusicById,
  updateMusic,
  deleteMusic,
};
