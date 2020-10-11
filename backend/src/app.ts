import express from "express";
import * as dotenv from "dotenv";

import connectDB from "./db";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

import productRoute from "./routes/productRoute";

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/v1", productRoute);
app.use(express.json());

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started in ${process.env.NODE_ENV} mode on port ${PORT}`);
  connectDB();
});
