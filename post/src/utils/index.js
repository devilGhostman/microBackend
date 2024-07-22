const jwt = require("jsonwebtoken");

module.exports = {
  HttpError: require("./httpError"),
};

module.exports.SuccessResponse = {
  success: true,
  message: "success",
  data: {},
  error: {},
};

module.exports.ErrorResponse = {
  success: false,
  message: "Something went wrong",
  data: {},
  error: {},
};

module.exports.ValidateSignature = async (req, res) => {
  try {
    const signature = req.get("Authorization");
    const payload = await jwt.verify(
      signature.split(" ")[1],
      process.env.APP_SECRET
    );
    req.user = payload;
    return true;
  } catch (error) {
    return false;
  }
};

module.exports.POST_ACTION = {
  ADD_POST_TO_SAVE: "ADD_POST_TO_SAVE",
  REMOVE_POST_FROM_SAVE: "REMOVE_POST_FROM_SAVE",
  ADD_POST_TO_LIKE: "ADD_POST_TO_LIKE",
  REMOVE_POST_FROM_LIKE: "REMOVE_POST_FROM_LIKE",
};

module.exports.COMMENT_ACTION = {
  ADD_COMMENT: "ADD_COMMENT",
  REMOVE_COMMENT: "REMOVE_COMMENT",
};
