const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const userRouter = express.Router();
//routes
userRouter
  .route("/")
  .post(userController.addUser);

userRouter.route("/:id")
  .all(authController.protect)
  .get(userController.getUserById);

userRouter
  .route("/:id")
  .all(authController.protect)
  .put(userController.updateUserById);

module.exports = userRouter;
