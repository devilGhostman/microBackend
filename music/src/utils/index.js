const jwt = require("jsonwebtoken");
const successResponse = require("./response/success-response");
const errorResponse = require("./response/error-response");

module.exports = {
  HttpError: require("./httpError"),
};

module.exports = {
  successResponse,
  errorResponse,
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    await jwt.verify(signature.split(" ")[1], process.env.APP_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};
