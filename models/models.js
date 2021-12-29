const sequelize = require("../db");
const { DataTypes } = require("sequelize");

// Create tables description
const User = sequelize.define("user", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: { allowNull: false, unique: true, type: DataTypes.STRING },
  password: { allowNull: false, type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  name: { type: DataTypes.STRING },
});

const Basket = sequelize.define("basket", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
});

const BasketTicket = sequelize.define("basket_ticket", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
});

const Ticket = sequelize.define("ticket", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
});

const Film = sequelize.define("film", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: { allowNull: false, unique: true, type: DataTypes.STRING },
  description: { allowNull: false, type: DataTypes.TEXT },
  img: { allowNull: false, type: DataTypes.STRING },
});

const Bonus = sequelize.define("bonus", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: { allowNull: false, unique: true, type: DataTypes.STRING },
});

const FilmsAndCinemas = sequelize.define("films-list", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
});

const Seat = sequelize.define("seat", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  type: { allowNull: false, unique: true, type: DataTypes.STRING },
});

const Schema = sequelize.define("schema", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
});

const Holl = sequelize.define("holl", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
});

const Cinema = sequelize.define("cinema", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  city: { allowNull: false, type: DataTypes.STRING },
  coordinate: { allowNull: false, type: DataTypes.STRING },
});

const CinemaFilmsAndCinemas = sequelize.define("cinema_filmsInlist", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
});

User.hasOne(Basket);
Basket.belongsTo(User);

Basket.hasMany(BasketTicket);
BasketTicket.belongsTo(Basket);

BasketTicket.hasOne(Ticket);
Ticket.belongsTo(BasketTicket);

Ticket.hasMany(Bonus);
Bonus.belongsTo(Ticket);

Ticket.hasOne(Film);
Film.belongsTo(Ticket);

FilmsAndCinemas.hasMany(Film);
Film.belongsTo(FilmsAndCinemas);

FilmsAndCinemas.belongsToMany(Cinema, { through: CinemaFilmsAndCinemas });
Cinema.belongsToMany(FilmsAndCinemas, { through: CinemaFilmsAndCinemas });

Schema.hasMany(Seat);
Seat.belongsTo(Schema);

Holl.hasOne(Schema);
Schema.belongsTo(Holl);

Cinema.hasMany(Holl);
Holl.belongsTo(Cinema);

module.exports = {
  User,
  Basket,
  BasketTicket,
  Ticket,
  Film,
  FilmsAndCinemas,
  Holl,
  Schema,
  Cinema,
  Seat,
  Bonus,
  CinemaFilmsAndCinemas,
};
