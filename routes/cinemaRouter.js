const Router = require("express");
const {
  createCinema,
  getCinemas,
  deleteCinema,
} = require("../controllers/cinemaController");
const router = new Router();

router.post("/", createCinema);
router.get("/", getCinemas);
router.delete("/:id", deleteCinema);

module.exports = router;
