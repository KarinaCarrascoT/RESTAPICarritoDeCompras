const fs = require("fs");
const Cart = require("../models/Cart");
const catchAsync = require("../utils/catchAsync");

//GET USER CART

exports.getCartByUserId = catchAsync(async (req, res, next) => {
  const carts = await Cart.findOne({ userId : req.body.userId });
    if (carts) {
      res.status(200).json({
        status: "success",
        timeOfRequest: req.requestTime,
        results: carts.length,
        data: {
            Carts : carts,
        },
      });
    } else {
      res.status(404).json({
        status: "not found",
      });
    }
  });


//UPDATE CART BY ID

exports.updateProductById = catchAsync(async (req, res) => {
  const foundCart = await Cart.findByIdAndUpdate(req.params.id);
  if (foundCart) {
    res.status(200).json({
      status: "success",
      data: {
        Carts: foundCart,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});

//GET ALL CARTS

exports.getAllCarts = catchAsync(async (req, res) => {
    const carts = await Cart.find(); 
    res.status(200).json({
        status: "success",
        timeOfRequest: req.requestTime,
        results: carts.length,
        data: {
            carts,
        },
      });
    });

//DELETE BY ID

exports.deleteCartById = catchAsync(async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  });

    
//UPDATE

exports.updateCartById = catchAsync(async (req, res) => {
    const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
  });

