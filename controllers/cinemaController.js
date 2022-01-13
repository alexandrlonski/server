const uuid = require("uuid");
const path = require("path");
const { Cinema } = require("../models/models");
const ApiError = require("../error/ApiError");
const { CINEMA_ERRORS } = require("../utils/errors");

const createCinema = async (req, res, next) => {
  try {
    const { city, name, description } = req.body;
    const checkCinema = await Cinema.findOne({ where: { city, name } });
    if (checkCinema) {
      return next(ApiError.badRequest(CINEMA_ERRORS.cinemaAlreadyExists));
    }
    const { img } = req.files;
    const fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));

    const cinema = await Cinema.create({
      name,
      city,
      description,
      img: fileName,
    });

    return res.json(cinema);
  } catch (e) {
    next(ApiError.badRequest(e.message));
  }
};
const getCinemas = async (req, res) => {
  const cinemas = await Cinema.findAndCountAll();
  return res.json(cinemas);
};

const deleteCinema = async (req, res) => {
  const { id } = req.params;
  const cinema = await Cinema.destroy({ where: { id } });
  return res.json(cinema);
};

module.exports = { createCinema, getCinemas, deleteCinema };
