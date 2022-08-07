import express from "express";
import { errorHandler, notFoundHandler } from "./middlewares";
const app = express();
app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .all("*", notFoundHandler)
  .use(errorHandler);

export default app;
