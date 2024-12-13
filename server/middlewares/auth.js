const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  // receive token
  const authHeader = req.headers.authorization;

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized - Token not provided',
    });
  }

  // token verification
  jwt.verify(token, 'app', (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: ' Token is not valid', error: err });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
};
