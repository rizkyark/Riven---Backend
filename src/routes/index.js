const express = require("express");

const Router = express.Router();

const productRoutes = require("./product");
const eventRoutes = require("./event");
const userRoutes = require("./user");
const wishtlistRoutes = require("./whistlist");
const bookingRoutes = require("./booking");
const authRoutes = require("./auth");

Router.use("/product", productRoutes);
Router.use("/event", eventRoutes);
Router.use("/user", userRoutes);
Router.use("/wishlist", wishtlistRoutes);
Router.use("/booking", bookingRoutes);
Router.use("/auth", authRoutes);

module.exports = Router;
