const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const filmRouter = require("./filmRouter");
const cinemaRouter = require("./cinemaRouter");
const hollRouter = require("./hollRouter");

router.use("/user", userRouter);
router.use("/film", filmRouter);
router.use("/cinema", cinemaRouter);
router.use("/holl", hollRouter);

module.exports = router;
