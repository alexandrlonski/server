const Router = require("express");
const {
  createFilm,
  getOneFilm,
  getAllFilms,
  deleteFilm,
} = require("../controllers/filmController");
const router = new Router();

router.post("/", createFilm);
router.get("/", getAllFilms);
router.get("/:id", getOneFilm);
router.delete("/", deleteFilm);

module.exports = router;
