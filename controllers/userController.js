const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");
const { USER_ERRORS } = require("../utils/errors");
require("dotenv").config();

const generateJwt = (id, email, role, name) => {
  return jwt.sign({ id, email, role, name }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

const registration = async (req, res, next) => {
  const regEmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
  const { email, password, role, name } = req.body;
  if (!email || !password || !name) {
    return next(ApiError.badRequest(USER_ERRORS.noEmailOrPasswordOrName));
  }
  if (!regEmail.test(email)) {
    return next(ApiError.badRequest(USER_ERRORS.incorrectEmail));
  }
  const candidate = await User.findOne({ where: { email } });
  if (candidate) {
    return next(ApiError.badRequest(USER_ERRORS.userAlreadyExists));
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
    return next(ApiError.internal(USER_ERRORS.notFound));
  }
  const comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    return next(ApiError.internal(USER_ERRORS.wrongPassword));
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
