import express from "express";
import { errorHandler, notFoundHandler } from "./middlewares";
import usersRouter from "./users/users.router";
const app = express();
app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/api/v1/users", usersRouter)
  .all("*", notFoundHandler)
  .use(errorHandler);

export default app;
