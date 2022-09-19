const express = require("express");
const cartController = require("./../controllers/cartController.js");
const authController = require("./../controllers/authController");
const cartRouter = express.Router();
//routes
cartRouter
  .route("/")
  .all(authController.protect)
  .get(cartController.getAllCarts)
  
cartRouter
  .route("/:id")
  .all(authController.protect)
  .delete(cartController.deleteCartById)
  .get(cartController.getCartByUserId);

cartRouter
    .put("/:id")
    .all(authController.protect);

module.exports = cartRouter;
