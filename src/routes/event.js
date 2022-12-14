const express = require("express");

const Router = express.Router();

const eventController = require("../controller/event");
const redisMiddleware = require("../middleware/redis");
const uploadMiddleware = require("../middleware/uploadFile");
const authMiddleware = require("../middleware/auth");

Router.get("/", eventController.showAllEvent);
Router.get(
  "/:id",
  redisMiddleware.getEventByIdRedis,
  eventController.getEventById
);
Router.post(
  "/",
  authMiddleware.authentication,
  // authMiddleware.isAdmin,
  uploadMiddleware.eventImage,
  redisMiddleware.clearEventRedis,
  eventController.createEvent
);
Router.patch(
  "/:id",
  authMiddleware.authentication,
  // authMiddleware.isAdmin,
  uploadMiddleware.eventImage,
  redisMiddleware.clearEventRedis,
  eventController.updateEvent
);
Router.delete(
  "/:id",
  // authMiddleware.authentication,
  // authMiddleware.isAdmin,
  redisMiddleware.clearEventRedis,
  eventController.deleteEvent
);

module.exports = Router;
