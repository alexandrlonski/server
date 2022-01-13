const USER_ERRORS = {
  noEmailOrPasswordOrName: "No email or password or name",
  incorrectEmail: "Incorrect email",
  userAlreadyExists: "User with this email already exists",
  notFound: "User is not found",
  wrongPassword: "Wrong password",
};
const FILM_ERRORS = {
  filmAlreadyExists: "Film with this title already exists",
};
const CINEMA_ERRORS = {
  cinemaAlreadyExists: "Cinema with this city and name already exists",
};

module.exports = { USER_ERRORS, FILM_ERRORS, CINEMA_ERRORS };
