const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
  SuccessResponse: require("./response/success-response"),
  ErrorResponse: require("./response/error-response"),
};

module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  const hashedPassword = await bcrypt.hash(enteredPassword, salt);
  return hashedPassword === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, process.env.APP_SECRET, {
      expiresIn: "1d",
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    const payload = await jwt.verify(
      signature.split(" ")[1],
      process.env.APP_SECRET
    );
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
