const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name must be filled!"],
    },
    price: {
      type: Number,
      required: [true, "Price must be filled!"],
    },
    stock: Number,
    status: {
      type: Boolean,
      default: true,
    },
    image_url: String,
  },
  {
    timestamps: {
      currentTime: ()=> Math.floor(Date.now() / 1000)
    }
  }
);

const Products = mongoose.model("Products", Schema);
module.exports = Products;
