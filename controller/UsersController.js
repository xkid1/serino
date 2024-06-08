"use strict";
import { Treasures, Users } from "../database/models/index.js";
class UsersController {
  /**
   * Bunos points
   * A bonus endpoint that could be useful is one that retrieves the nearest treasure box based on the user's current location.
   * This endpoint could take the user's latitude and longitude as input and return the details of the closest treasure box.
   */

  static async view(req, res) {
    try {
      /**
       * Since in the User table does not have a column latitude and longitude,
       *
       */

      return res.status(200).json({
        message: "Ok",
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default UsersController;
