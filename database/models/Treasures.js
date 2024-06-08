"use strict";
import db from "../config/database.js";
const { sequelize, Sequelize } = db;

const Treasures = sequelize.define("Treasures", {
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Treasures;
