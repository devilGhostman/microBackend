const { ValidateSignature, ErrorResponse } = require("../utils/index");

module.exports = async (req, res, next) => {
  try {
    const isAuthenticated = await ValidateSignature(req, res);
    if (isAuthenticated) {
      return next();
    }
    ErrorResponse.error = "Unauthenticated";
    return res.status(401).json(ErrorResponse);
  } catch (error) {
    throw new Error(error);
  }
};
