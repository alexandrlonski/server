const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    // Only POST GET PUT DELETE
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer, payload
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
