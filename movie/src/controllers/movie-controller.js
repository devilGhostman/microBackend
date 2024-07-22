const { MovieService } = require("../services/index");
const { SuccessResponse, ErrorResponse } = require("../utils/index");
const fs = require("fs");

async function createMovie(req, res, next) {
  try {
    const response = await MovieService.createMovie(req.body, req.file.originalname);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;

    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Failed to delete file:", err);
        }
      });
    }

    return res.status(400).json(ErrorResponse);
  }
}

async function getMovies(req, res, next) {
  try {
    const response = await MovieService.getMovies(req.query);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function getMovieById(req, res, next) {
  try {
    const response = await MovieService.getMovieById(req.params.id);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function updateMovie(req, res, next) {
  try {
    const response = await MovieService.updateMovie(req.params.id, req.body);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function deleteMovie(req, res, next) {
  try {
    const response = await MovieService.deleteMovie(req.params.id);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    return res.status(400).json(error);
  }
}

module.exports = {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
