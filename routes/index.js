const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const filmRouter = require("./filmRouter");
const cinemaRouter = require("./cinemaRouter");

router.use("/user", userRouter);
router.use("/film", filmRouter);
router.use("/cinema", cinemaRouter);

module.exports = router;
