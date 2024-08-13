const jwt = require('jsonwebtoken');
const errorHandler = require('./error.js');

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  // If no token is found, return an unauthorized error
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
