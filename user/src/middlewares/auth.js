const { ValidateSignature } = require("../utils/index");

module.exports = async (req, res, next) => {
  try {
    const isAuthenticated = await ValidateSignature(req);
    if (isAuthenticated) {
      return next();
    }
    return res.status(401).json({ message: "Unauthenticated" });
  } catch (error) {
    throw new Error(error);
  }
};
