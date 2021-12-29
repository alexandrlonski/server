const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const filmRouter = require("./filmRouter");

router.use("/user", userRouter);
router.use("/film", filmRouter);

module.exports = router;
