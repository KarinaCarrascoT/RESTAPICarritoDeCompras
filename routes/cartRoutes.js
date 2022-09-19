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
/*POST /api/v1/cart/product  -- Si existe un shopping cart que este en estado PENDING 
anadir el producto a ese carrito, 
si no creamos el carrito de compras y anadimos el primer producto
*/
cartRouter
  .route("/product")
  .all(authController.protect)
  .post(cartController.AddProductUserCart);

/*
DELETE /api/v1/cart/product/:id -- Si existe un shopping cart que este en estado pending 
y que tenga ese producto removemos el producto de ese carrito, sino damos error
*/
cartRouter
  .route("/product")
  .all(authController.protect)
  .delete(cartController.RemoveProductUserCart);
/*
POST /api/v1/cart/pay -- Paga el carrito que este en estado pendiente con minimo un producto 
en el. Si no existe un carrito con estas caracteristicas se dispara un error
*/  
cartRouter
  .route("/product/:id")
  .all(authController.protect)
  .post(cartController.PaidUserCart);

cartRouter
    .route("/:id")
    .all(authController.protect)
    .put(cartController.updateCartById);

module.exports = cartRouter;
