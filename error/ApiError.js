const { StatusCodes } = require("http-status-codes");
class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(StatusCodes.NOT_FOUND, message);
  }

  static internal(message) {
    return new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, message);
  }

  static forbidden(message) {
    return new ApiError(StatusCodes.FORBIDDEN, message);
  }
}

module.exports = ApiError;
