const express = require("express");

const Router = express.Router();

const authController = require("../controller/auth");

Router.post("/register", authController.register);
Router.post("/login", authController.login);
Router.post("/refresh", authController.refresh);
Router.post("/logout", authController.logout);

module.exports = Router;
