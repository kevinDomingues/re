const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json("You don't have a token!");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user_id = decoded.user_id;
  } catch (err) {
    return res.status(401).json("Token inválido");
  }
  return next();
};

module.exports = verifyToken;