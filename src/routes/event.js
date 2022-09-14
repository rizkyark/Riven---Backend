const express = require("express");

const Router = express.Router();

const eventController = require("../controller/event");
const redisMiddleware = require("../middleware/redis");

Router.get("/", eventController.showAllEvent);
Router.get(
  "/:id",
  redisMiddleware.getEventByIdRedis,
  eventController.getEventById
);
Router.patch("/:id", eventController.updateProduct);
Router.delete("/:id", eventController.deleteEvent);
Router.post("/", eventController.createEvent);

module.exports = Router;
