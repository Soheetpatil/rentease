const mongoose = require("mongoose");

const bookingItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    name: String,
    image: String,
    monthlyPrice: Number,
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [bookingItemSchema],
    rentalMonths: {
      type: Number,
      required: true,
      min: 1
    },
    deliveryAddress: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    totalMonthlyRent: {
      type: Number,
      required: true
    },
    totalDeposit: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Delivered", "Cancelled"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
