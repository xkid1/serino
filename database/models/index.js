import MoneyValues from "./MoneyValues.js";
import Treasures from "./Treasures.js";
import Users from "./Users.js";

/**
 * Defined all Relationship
 */

Treasures.hasMany(MoneyValues, { foreignKey: "treasure_id" });
MoneyValues.belongsTo(Treasures, { foreignKey: "treasure_id" });

export { MoneyValues, Treasures, Users };
