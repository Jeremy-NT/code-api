const jwt = require("jsonwebtoken");
const secretKey = "secretkey";

function verifyToken(req, res, next) {
  // get auth header value
  const bearerHeader = req.headers["authorization"];

  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");

    // get token from array (index 1)
    const bearerToken = bearer[1];

    // set token
    req.token = bearerToken;

    // Next middleware
    next();
  } else {
    // Forbidden
    res.status(403).json({ message: "Unauthenticated" });
  }
}

module.exports = { verifyToken };
