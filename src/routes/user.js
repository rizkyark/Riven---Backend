const express = require("express");

const Router = express.Router();

const userController = require("../controller/user");

Router.get("/", userController.showAllUser);
Router.get("/:id", userController.getUserById);
Router.patch("/:id", userController.updateUser);
Router.delete("/:id", userController.deleteUser);
Router.post("/", userController.createUser);

module.exports = Router;
