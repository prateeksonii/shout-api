import { Router } from "express";
import { validate } from "../middlewares";
import { createUser } from "./users.controller";
import { createUserValidator } from "./users.validator";

const usersRouter = Router();

usersRouter.post("/", validate(createUserValidator), createUser);

export default usersRouter;
