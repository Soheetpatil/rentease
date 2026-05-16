const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const User = require("../models/User");
const products = require("./products");

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    await User.create({
      name: "RentEase Admin",
      email: "admin@rentease.com",
      password: "admin123",
      role: "admin"
    });

    await Product.insertMany(products);
    console.log("Sample users and products imported");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
