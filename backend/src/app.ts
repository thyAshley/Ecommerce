import express from "express";
import * as dotenv from "dotenv";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
import connectDB from "./db";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

import productRoute from "./routes/productRoute";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started in ${process.env.NODE_ENV} mode on port ${PORT}`);
  connectDB();
});
