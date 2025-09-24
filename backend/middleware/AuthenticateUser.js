const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403); // Forbidden
  }
};
