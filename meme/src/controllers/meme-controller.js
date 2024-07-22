const { MemeService } = require("../services/index");
const { successResponse, errorResponse } = require("../utils/index");
const fs = require("fs");

async function createMeme(req, res, next) {
  try {
    const response = await MemeService.createMeme(req.body, req.file.originalname);
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

async function getMemes(req, res, next) {
  try {
    const response = await MemeService.getMemes();
    successResponse.data = response;
    return res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error.message;
    return res.status(400).json(errorResponse);
  }
}

async function getMemeById(req, res, next) {
  try {
    const response = await MemeService.getMemeById(req.params.id);
    successResponse.data = response;
    return res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error.message;
    return res.status(400).json(errorResponse);
  }
}

async function updateMeme(req, res, next) {
  try {
    const response = await MemeService.updateMeme(req.params.id, req.body);
    successResponse.data = response;
    return res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error.message;
    return res.status(400).json(errorResponse);
  }
}

async function deleteMeme(req, res, next) {
  try {
    const response = await MemeService.deleteMeme(req.params.id);
    successResponse.data = response;
    return res.status(200).json(successResponse);
  } catch (error) {
    errorResponse.error = error.message;
    return res.status(400).json(errorResponse);
  }
}

module.exports = {
  createMeme,
  getMemes,
  getMemeById,
  updateMeme,
  deleteMeme,
};
