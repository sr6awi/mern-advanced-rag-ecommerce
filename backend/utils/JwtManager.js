require("dotenv").config();
const jwt = require("jsonwebtoken");

// Generates a JWT token with different expiration for login/password reset
exports.generateToken = (userPayload, isPasswordReset = false) => {
  const expiresIn = isPasswordReset
    ? process.env.PASSWORD_RESET_TOKEN_EXPIRATION
    : process.env.LOGIN_TOKEN_EXPIRATION;

  return jwt.sign(userPayload, process.env.SECRET_KEY, { expiresIn });
};