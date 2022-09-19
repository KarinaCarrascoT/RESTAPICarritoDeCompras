const express = require("express");
const cartController = require("./../controllers/cartController.js");
const authController = require("./../controllers/authController");
const cartRouter = express.Router();
const productcartController = express.Router();

//routes
cartRouter
  .route("/")
  .all(authController.protect)
  .get(cartController.getAllCarts)
  
cartRouter
  .route("/:id")
  .all(authController.protect)
  .delete(cartController.deleteCartById)

cartRouter
  .route("/:id")
  .all(authController.protect)
  .delete(cartController.deleteCartById)

cartRouter
  .route("/:id")
  .all(authController.protect)
  .put(cartController.updateCartById)

cartRouter
  .route("/")
  .all(authController.protect)
  .post(cartController.getCartByUserId);

  cartRouter
  .route("/product")
  .all(authController.protect)
  .post(cartController.AddProductUserCart);

cartRouter
  .route("/:id")
  .all(authController.protect)
  .put(cartController.updateCartById);

productcartController
  .all(authController.protect)
  .post(productcartController)

module.exports = cartRouter;
