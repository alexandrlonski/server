const Router = require("express");
const {
  createFilm,
  getOneFilm,
  getAllFilms,
  deleteFilm,
  updateFilm,
} = require("../controllers/filmController");
const router = new Router();

router.post("/", createFilm);
router.get("/", getAllFilms);
router.get("/:id", getOneFilm);
router.delete("/:id", deleteFilm);
router.put("/:id", updateFilm);

module.exports = router;
