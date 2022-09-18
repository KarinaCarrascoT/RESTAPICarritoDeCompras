const fs = require("fs");
const Cart = require("../models/Cart");
//const Product = require("../models/Cart");
const catchAsync = require("../utils/catchAsync");

//Obtiene Carrito del Usuario
exports.get("/find/:userId") = catchAsync(async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json({
      status: "success",
      timeOfRequest: req.requestTime,
      results: cart.length,
      data: {
          cart,
      },
    });
  });


/*//GET ALL
exports.get("/") = catchAsync(async (req, res) => {
    const cart = await Cart.find({ userId: req.params.userId });
    res.status(200).json({
        status: "success",
        timeOfRequest: req.requestTime,
        results: cart.length,
        data: {
            cart,
        },
      });
    });

//DELETE
exports.delete("/:id") = catchAsync(async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  });

    
//UPDATE
exports.put("/:id") = catchAsync(async (req, res) => {
    const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
  });

*/