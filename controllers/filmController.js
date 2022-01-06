const uuid = require("uuid");
const path = require("path");
const { Film } = require("../models/models");
const ApiError = require("../error/ApiError");
const { FILM } = require("../utils/errors");

const createFilm = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const checkTitle = await Film.findOne({ where: { title } });
    if (checkTitle) {
      return next(ApiError.badRequest(FILM.filmAlreadyExists));
    }
    const { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));

    const film = await Film.create({
      title,
      description,
      img: fileName,
    });

    return res.json(film);
  } catch (e) {
    next(ApiError.badRequest(e.message));
  }
};
const getAllFilms = async (req, res) => {
  let { limit, page } = req.query;
  page = page || 1;
  limit = limit || 5;
  let offset = page * limit - limit;
  const films = await Film.findAndCountAll({ limit, offset });

  return res.json(films);
};
const getOneFilm = async (req, res) => {
  const { id } = req.params;
  const film = await Film.findOne({ where: { id } });
  return res.json(film);
};
const deleteFilm = async (req, res) => {
  const { id } = req.params;
  const film = await Film.destroy({ where: { id: id } });
  return res.json(film);
};

module.exports = { createFilm, getOneFilm, getAllFilms, deleteFilm };
