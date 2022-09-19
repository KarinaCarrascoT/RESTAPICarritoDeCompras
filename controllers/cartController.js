const fs = require("fs");
const Cart = require("../models/Cart");
const catchAsync = require("../utils/catchAsync");


//POST ADD PRODUCT TO CART
exports.AddProductUserCart = catchAsync(async (req, res, next) => {
  let { userId } = req.body.userId;
  let { productsCart } = req.body.productsCart;

  const cartFound = await Cart.findOne(userId);
  if(cartFound)
  {
    const carts = (await Cart.findOne(userId)).toObject();
    var productosItems = carts.productosCart;

    if(carts.status == "PENDING")
    {
      for (i=0; i++; productosItems.length<0)
      {
        cartFound.productosCart.add(productosItems[i]);
      }
      await Cart.findByIdAndUpdate(cartFound.id);
      res.status(200).json({
        status_: "Have Shopping Cart AND Add Product"  ,
        data: {
          Carts: cartFound
        },      
      });
    }
    else
    {
      cartNew : new Cart;
      cartNew.userId = userId
      cartNew.estadus = "PENDING", 
      cartNew.productosCart = productosItems;
      Cart.create(cartNew);
      res.status(200).json({
        status_: "Have Shopping Cart NEW"  ,
        data: {
          Carts: cartNew
        },       
      });

    }
  }
 else {
  res.status(404).json({
    status_: "Create Shopping Cart",
  });
}
});
  
//POST PAID SHOPPING CART
exports.PaidUserCart = catchAsync(async (req, res, next) => {
  let { id } = req.params.id;
  const cartFound = await Cart.findById(req.params.id);
  if(cartFound)
  {
    const carts = (await Cart.findOne(userId)).toObject();

    if(carts.status == "PENDING")
    {
      if(carts.productosItems.length>0)
      {
        carts.status = "PAID";
        await Cart.findByIdAndUpdate(id);
        res.status(200).json({
          status_: "Shopping Cart Status Changing to PAID"  ,
          data: {
            Carts: cartFound
          },      
        });
      }
      else
      {
        res.status(200).json({
          status_: "Error, Shopping Cart is empty "  ,
          data: {
            Carts: cartFound
          },      
        });
      }
    }
  }
 else {
  res.status(404).json({
    status_: "Shopping Cart Pendig Not Found",
  });
}
});

//DELETE PRODUCT TO CART
exports.RemoveProductUserCart = catchAsync(async (req, res, next) => {
  let { userId } = req.body.userId;
  let { productsCart } = req.body.productsCart;

  const cartFound = await Cart.findOne(userId);
  if(cartFound)
  {
    const carts = (await Cart.findOne(userId)).toObject();
    var productosItems = carts.productosCart;

    if(carts.status == "PENDING")
    {
      for (i=0; i++; productosItems.length<0)
      {
        cartFound.productosCart(productosItems[i]);
        cartFound.productosCart = cartFound.productosCart.filter(data => data.ProductID != productosItems[i].ProductID);
      }
      await Cart.findByIdAndUpdate(cartFound.id);
      res.status(200).json({
        status_: "Have Shopping Cart AND Add Product"  ,
        data: {
          Carts: cartFound
        },      
      });
    }
  }
 else {
  res.status(404).json({
    status_: "Not Found",
  });
}
});


//UPDATE CART BY ID

exports.updateCartById = catchAsync(async (req, res) => {
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

