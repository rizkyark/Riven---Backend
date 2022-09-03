const express = require("express");

const Router = express.Router();

const userController = require("../controller/user");

Router.get("/", userController.showAllUser);
Router.get("/:id", userController.showAllUser);
Router.post("/", userController.createUser);

module.exports = Router;
