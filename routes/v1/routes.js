import express from "express";
import {
  TreasuresController,
  UsersController,
} from "../../controller/index.js";
const router = express.Router();

router.get("/treasures-boxes", TreasuresController.view);

/**
 * bonus endpoint end point
 */
router.get("/user/treasures", UsersController.view);

router.get("*", (req, res) => {
  res.status(400).json({
    message: "Bad Request",
  });
});

export default router;
