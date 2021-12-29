require("dotenv").config();
const express = require("express");
const models = require("./models/models");
const sequelize = require("./db");
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 8080;

const app = express(); //create server
app.use(cors());
app.use(express.json());
app.use("/api", router);

// Error Handling
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate(); // Connect with database
    await sequelize.sync(); // Sync with database
    app.listen(PORT, () => console.log(`Server started omn port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
