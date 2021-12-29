const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer, payload
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: ReasonPhrases.UNAUTHORIZED });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: ReasonPhrases.UNAUTHORIZED });
  }
};
