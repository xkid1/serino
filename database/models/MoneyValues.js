"use strict";

import db from "../config/database.js";
const { sequelize, Sequelize } = db;
const MoneyValues = sequelize.define("MoneyValues", {
  treasure_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "Treasures",
      key: "id",
    },
  },
  amt: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default MoneyValues;
