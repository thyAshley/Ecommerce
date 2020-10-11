import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import userData from "./src/data/users";
import productData from "./src/data/products";
import User from "./src/models/userModel";
import Product from "./src/models/productModel";
import Order from "./src/models/orderModel";
import connectDB from "./src/db";

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    const createdUser = await User.insertMany(userData);
    const adminUser = createdUser[0]._id;

    const sampleProducts = productData.map((prod) => {
      return { ...prod, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
