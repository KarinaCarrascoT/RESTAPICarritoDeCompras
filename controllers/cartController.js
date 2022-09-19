const fs = require("fs");
const Cart = require("../models/Cart");
//const Product = require("../models/Cart");
const catchAsync = require("../utils/catchAsync");

//GET USER CART
exports.getCartByUserId = catchAsync(async (req, res) => { //userId
    const carts = await Cart.findOne({ userId: req.params.userId });
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

/*exports.getProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
}); */
//GET ALL
exports.getAllCarts = catchAsync(async (req, res) => {
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

