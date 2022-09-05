const express = require("express");

const Router = express.Router();

const wishtlistController = require("../controller/whistlist");

Router.get("/", wishtlistController.getAllWhistlist);
Router.post("/", wishtlistController.createProduct);
Router.delete("/:id", wishtlistController.deleteWhishlist);

module.exports = Router;
