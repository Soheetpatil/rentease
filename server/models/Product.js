const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ["Furniture", "Appliance"],
      required: true
    },
    brand: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    monthlyPrice: {
      type: Number,
      required: true,
      min: 0
    },
    deposit: {
      type: Number,
      default: 0,
      min: 0
    },
    stock: {
      type: Number,
      default: 0,
      min: 0
    },
    rating: {
      type: Number,
      default: 4.5
    },
    features: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
