const Router = require("express");
const {
  createCinema,
  getCinemas,
  deleteCinema,
  updateCinema,
} = require("../controllers/cinemaController");
const router = new Router();

router.post("/", createCinema);
router.get("/", getCinemas);
router.delete("/:id", deleteCinema);
router.put("/:id", updateCinema);

module.exports = router;
