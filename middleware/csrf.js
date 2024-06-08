"use strict";
/**
 * CSRF protection
 * @param {object} req
 * @param {object} res
 * @param {Function} next
 * @returns {*}
 */
export const csrf = (req, res, next) => {
  if (req.header("X-Requested-With") != "XMLHttpRequest") {
    return res.status(400).json({
      message: "Invalid access",
    });
  }
  next();
};
