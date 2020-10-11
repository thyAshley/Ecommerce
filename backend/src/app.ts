import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

import routes from "./routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(routes);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`server started in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
