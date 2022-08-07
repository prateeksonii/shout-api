import { RequestHandler } from "express";
import { prisma } from "../db";

export const isAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      res.status(401);
      throw new Error("Not authenticated");
    }

    const [, token] = authorization.split(" ");

    if (!token) {
      res.status(401);
      throw new Error("Not authenticated");
    }

    const userToken = await prisma.userToken.findUniqueOrThrow({
      where: {
        token,
      },
    });

    req.userId = userToken.userId;

    return next();
  } catch (error) {
    next(error);
  }
};
