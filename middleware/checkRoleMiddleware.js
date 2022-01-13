const jwt = require("jsonwebtoken");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1]; // Bearer, payload
      if (!token) {
        return response
          .status(StatusCodes.UNAUTHORIZED)
          .send({ message: ReasonPhrases.UNAUTHORIZED });
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return response
          .status(StatusCodes.FORBIDDEN)
          .send({ message: ReasonPhrases.FORBIDDEN });
      }
      req.user = decoded;
      next();
    } catch (e) {
      return response
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: ReasonPhrases.UNAUTHORIZED });
    }
  };
};
