import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler, notFoundHandler } from "./middlewares";
import usersRouter from "./users/users.router";
const app = express();
app
  .use(cors())
  .use(helmet())
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/api/v1/users", usersRouter)
  .all("*", notFoundHandler)
  .use(errorHandler);

export default app;
