const express = require("express");
const cartController = require("./../controllers/cartController");
const authController = require("./../controllers/authController");
const cartRouter = express.Router();
//routes
cartRouter
  .route("/")
  .all(authController.protect)
  .get(cartController.getAllCartProducts)
  .post(cartController.addProductCart);
cartRouter
  .route("/:id")
  .all(authController.protect)
  .delete(cartController.deleteProductCart);
cartRouter
    .get("/find/:userId")
    .all(authController.protect);

cartRouter
    .put("/:id")
    .all(authController.protect);

module.exports = cartRouter;
