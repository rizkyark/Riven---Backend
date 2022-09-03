const express = require("express");

const Router = express.Router();

const productRoutes = require("./product");
const eventRoutes = require("./event");
const userRotes = require("./user")

Router.use("/product", productRoutes);
Router.use("/event", eventRoutes);
Router.use("/user", userRotes);

module.exports = Router;
