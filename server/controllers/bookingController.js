const Booking = require("../models/Booking");
const Product = require("../models/Product");

const createBooking = async (req, res, next) => {
  try {
    const { items, rentalMonths, deliveryAddress, phone } = req.body;

    if (!items || items.length === 0) {
      res.status(400);
      throw new Error("No rental items provided");
    }

    const productIds = items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    const bookingItems = items.map((item) => {
      const product = products.find((entry) => entry._id.toString() === item.product);
      if (!product) throw new Error("One or more products were not found");

      return {
        product: product._id,
        name: product.name,
        image: product.image,
        monthlyPrice: product.monthlyPrice,
        quantity: item.quantity
      };
    });

    const totalMonthlyRent = bookingItems.reduce(
      (sum, item) => sum + item.monthlyPrice * item.quantity,
      0
    );
    const totalDeposit = bookingItems.reduce((sum, item) => {
      const product = products.find((entry) => entry._id.toString() === item.product.toString());
      return sum + (product.deposit || 0) * item.quantity;
    }, 0);

    const booking = await Booking.create({
      user: req.user._id,
      items: bookingItems,
      rentalMonths,
      deliveryAddress,
      phone,
      totalMonthlyRent,
      totalDeposit
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(404);
      throw new Error("Booking not found");
    }

    booking.status = req.body.status || booking.status;
    const updated = await booking.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

module.exports = { createBooking, getMyBookings, getAllBookings, updateBookingStatus };
