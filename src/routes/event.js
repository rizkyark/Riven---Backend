const express = require("express");

const Router = express.Router();

const eventController = require("../controller/event");

Router.get("/", eventController.showAllEvent);
Router.get("/:id", eventController.getEventById);
Router.patch("/:id", eventController.updateProduct);
Router.delete("/:id", eventController.deleteEvent);
Router.post("/", eventController.createEvent);

module.exports = Router;
