const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");
const { USER } = require("../utils/errors");

const generateJwt = (id, email, role, name) => {
  return jwt.sign({ id, email, role, name }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};
console.log(USER);
const registration = async (req, res, next) => {
  const reEmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
  const { email, password, role, name } = req.body;
  if (!email || !password || !name) {
    return next(ApiError.badRequest(USER.noEmailOrPasswordOrName));
  }
  if (!reEmail.test(email)) {
    return next(ApiError.badRequest(USER.incorrectEmail));
  }
  const candidate = await User.findOne({ where: { email } });
  if (candidate) {
    return next(ApiError.badRequest(USER.userAlreadyExists));
  }
  const hashPassword = await bcrypt.hash(password, parseInt(process.env.HASH));
  const user = await User.create({ email, role, password: hashPassword, name });
  const basket = await Basket.create({ userId: user.id });
  const token = generateJwt(user.id, user.email, user.role, user.name);
  return res.json({ token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(ApiError.internal(USER.notFound));
  }
  let comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    return next(ApiError.internal(USER.wrongPassword));
  }
  const token = generateJwt(user.id, user.email, user.role, user.name);
  return res.json({ token });
};

const check = async (req, res, next) => {
  const token = generateJwt(
    req.user.id,
    req.user.email,
    req.user.role,
    req.user.name
  );
  return res.json({ token });
};

module.exports = { registration, login, check };
