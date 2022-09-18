const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "user is required"],
    unique: true,
  },
  status: { //PENDING o PAID
    type: String,
    required: true,
    unique: true,
  },
  products: [
    {
        productId: {
            type: String,
            required: true,
            unique: true,
        },
        saleprice: {
            type: Number,
            required: [true, "price is required"],
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
  ],
}
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;

