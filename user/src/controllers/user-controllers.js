const { UserServices } = require("../services/index");
const { SuccessResponse, ErrorResponse } = require("../utils/index");
const fs = require("fs");

async function registerUser(req, res, next) {
  try {
    const response = await UserServices.registerUser(req);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    console.log("controller", error);
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

async function signInUser(req, res, next) {
  try {
    const response = await UserServices.signInUser(req);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function getUsers(req, res, next) {
  try {
    const response = await UserServices.getUsers(req);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function getUserById(req, res, next) {
  try {
    const response = await UserServices.getUserById(req);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function getPostusers(req, res, next) {
  try {
    const response = await UserServices.getPostUsers(req);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function updateUser(req, res, next) {
  try {
    const response = await UserServices.updateUser(req);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function deleteUser(req, res, next) {
  try {
    const response = await UserServices.deleteUser(req);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

async function addRemoveFriend(req, res, next) {
  try {
    const response = await UserServices.addRemoveFriend(req);
    SuccessResponse.data = response;
    return res.status(200).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error.message;
    return res.status(400).json(ErrorResponse);
  }
}

module.exports = {
  registerUser,
  signInUser,
  getUsers,
  getUserById,
  getPostusers,
  updateUser,
  deleteUser,
  addRemoveFriend,
};
