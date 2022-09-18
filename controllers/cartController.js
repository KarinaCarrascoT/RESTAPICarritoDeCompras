const fs = require("fs");
const Cart = require("../models/Cart");
//const Product = require("../models/Cart");
const catchAsync = require("../utils/catchAsync");

//GET USER CART
exports.getCartById("/find/:userId") = catchAsync(async (req, res) => {
    const carts = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json({
      status: "success",
      timeOfRequest: req.requestTime,
      results: carts.length,
      data: {
          cart,
      },
    });
  });


//GET ALL
exports.getAllCarts("/") = catchAsync(async (req, res) => {
    const carts = await Cart.find({ userId: req.params.userId });
    res.status(200).json({
        status: "success",
        timeOfRequest: req.requestTime,
        results: carts.length,
        data: {
            carts,
        },
      });
    });

//DELETE
exports.deleteCartById("/:id") = catchAsync(async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  });

    
//UPDATE
exports.updateCartById("/:id") = catchAsync(async (req, res) => {
    const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
  });

