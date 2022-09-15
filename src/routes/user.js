const express = require("express");

const Router = express.Router();

const userController = require("../controller/user");
const authMiddleware = require("../middleware/auth");
const uploadMiddleware = require("../middleware/uploadFile");

Router.get(
  "/",
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  userController.showAllUser
);
Router.get("/:id", authMiddleware.authentication, userController.getUserById);
Router.patch(
  "/profile/:id",
  authMiddleware.authentication,
  userController.updateUser
);
Router.patch(
  "/password/:id",
  authMiddleware.authentication,
  userController.updatePassword
);
Router.patch(
  "/image/:id",
  authMiddleware.authentication,
  uploadMiddleware.userImage,
  userController.updateImage
);
Router.delete("/:id", authMiddleware.authentication, userController.deleteUser);
Router.post("/", userController.createUser);

module.exports = Router;
