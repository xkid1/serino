"use strict";
import Sequelize from "sequelize";
const db = {};

/**
 * Used the process.env
 */

let sequelize = new Sequelize("kitra", "kitra", "@kitra", {
  host: "127.0.0.1",
  dialect: "mysql",
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
