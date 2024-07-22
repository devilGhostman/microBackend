const jwt = require("jsonwebtoken");

module.exports = {
  HttpError: require("./httpError"),
};

module.exports.SuccessResponse = {
  success: true,
  message: "success",
  data: {},
  error: {},
}

module.exports.ErrorResponse = {
  success: false,
  message: "Something went wrong",
  data: {},
  error: {},
}

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    await jwt.verify(signature.split(" ")[1], process.env.APP_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};
