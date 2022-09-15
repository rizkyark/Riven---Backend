const express = require("express");

const Router = express.Router();

const wishtlistController = require("../controller/whistlist");
const authMiddleware = require("../middleware/auth");

Router.get(
  "/",
  authMiddleware.authentication,
  wishtlistController.getAllWhistlist
);
Router.post(
  "/",
  authMiddleware.authentication,
  wishtlistController.createProduct
);
Router.delete(
  "/:id",
  authMiddleware.authentication,
  wishtlistController.deleteWhishlist
);

module.exports = Router;
