const express = require("express");

const Router = express.Router();

const bookingController = require("../controller/booking");

Router.post("/", bookingController.createBooking);
Router.get("/:id", bookingController.getBookingByUserId);

module.exports = Router;
