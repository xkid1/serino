"use strict";
import getDistanceFromLatLonInKm from "../lib/getDistanceFromLatLonInKm.js";
import { Treasures, MoneyValues } from "../database/models/index.js";
import { Op } from "sequelize";
export class TreasuresController {
  static async view(req, res) {
    try {
      let { latitude, longitude, distance, minPrizeValue, maxPrizeValue } =
        req.query;
      let treasures, nearbyTreasures;
      if (!latitude || !longitude || !distance) {
        return res
          .status(400)
          .json({ message: "Latitude, longitude, and distance are required" });
      }
      if (![1, 10].includes(Number(distance))) {
        return res.status(400).json({ error: "Distance must be 1 or 10" });
      }

      const runNext = (treasure) => {
        return treasure.filter((treasure) => {
          const dist = getDistanceFromLatLonInKm(
            parseFloat(latitude),
            parseFloat(longitude),
            treasure.latitude,
            treasure.longitude
          );
          return dist <= distance;
        });
      };

      if (minPrizeValue && maxPrizeValue) {
        minPrizeValue = minPrizeValue.split(".")[0];
        maxPrizeValue = maxPrizeValue.split(".")[0];
        const minPrizeValueToNumber = Number(minPrizeValue);
        const maxPrizeValueToNumber = Number(maxPrizeValue);
        if (
          isNaN(minPrizeValue) ||
          isNaN(maxPrizeValue) ||
          minPrizeValueToNumber < 10 ||
          maxPrizeValueToNumber > 30 ||
          minPrizeValueToNumber > maxPrizeValueToNumber
        ) {
          return res.status(400).json({ error: "Invalid prize value range" });
        }
        treasures = await Treasures.findAll({
          include: [
            {
              model: MoneyValues,
              where: {
                amt: {
                  [Op.between]: [minPrizeValueToNumber, maxPrizeValueToNumber],
                },
              },
            },
          ],
        });
        nearbyTreasures = runNext(treasures);

        return res.status(200).json({ treasures: nearbyTreasures });
      }
      treasures = await Treasures.findAll();
      nearbyTreasures = runNext(treasures);
      return res.status(200).json({ treasures: nearbyTreasures });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
