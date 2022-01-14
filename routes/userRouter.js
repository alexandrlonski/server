const Router = require("express");
const router = new Router();
const {
  registration,
  login,
  check,
  getUsers,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", registration);
router.post("/login", login);
router.get("/auth", authMiddleware, check);
router.get("/", getUsers);

module.exports = router;
