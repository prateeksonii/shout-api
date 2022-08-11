import { Router } from "express";
import { isAuthenticated } from "../auth/auth.middleware";
import { validate } from "../middlewares";
import { createUser, createUserContact } from "./users.controller";
import { createUserValidator } from "./users.validator";

const usersRouter = Router();

usersRouter.post("/", validate(createUserValidator), createUser);
usersRouter.post("/contacts", isAuthenticated, createUserContact);

export default usersRouter;
