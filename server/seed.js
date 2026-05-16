const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const products = [
  {
    name: "Modern Sofa",
    category: "Furniture",
    brand: "Urban Living",
    description: "Comfortable 3-seater sofa for modern homes",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    monthlyPrice: 1200,
    deposit: 3000,
    stock: 5,
    rating: 4.6,
    features: ["Soft cushions", "Wood frame", "Premium fabric"]
  },
  {
    name: "Double Bed",
    category: "Furniture",
    brand: "SleepWell",
    description: "Queen size bed with strong wooden structure",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    monthlyPrice: 1500,
    deposit: 4000,
    stock: 3,
    rating: 4.7,
    features: ["Storage base", "Durable frame"]
  },
  {
    name: "Washing Machine",
    category: "Appliance",
    brand: "LG",
    description: "Fully automatic front-load washing machine",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
    monthlyPrice: 1000,
    deposit: 2500,
    stock: 4,
    rating: 4.4,
    features: ["Energy efficient", "Quick wash mode"]
  }
];

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Products seeded successfully 🚀");
    process.exit();
  } catch (error) {
    console.log("Seed error:", error);
    process.exit(1);
  }
};

seedProducts();