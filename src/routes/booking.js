const express = require("express");

const Router = express.Router();

const bookingController = require("../controller/booking");
const authMiddleware = require("../middleware/auth");

Router.post(
  "/",
  authMiddleware.authentication,
  bookingController.createBooking
);
Router.get(
  "/:id",
  authMiddleware.authentication,
  bookingController.getBookingByUserId
);

module.exports = Router;
