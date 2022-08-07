import { RequestHandler } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { prisma } from "../db";
import { SignInBody } from "./auth.validator";

export const signIn: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body as SignInBody;

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    const isValid = await argon2.verify(user.password, password);

    if (!isValid) {
      res.status(401);
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "10y",
    });

    await prisma.userToken.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        token,
      },
      update: {
        token,
      },
    });

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const signOut: RequestHandler = async (req, res, next) => {
  const { userId } = req;

  try {
    await prisma.userToken.delete({
      where: {
        userId,
      },
    });

    res.status(200).json({ message: "Signed out" });
  } catch (error) {
    next(error);
  }
};

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const { userId } = req;

  try {
    if (!userId) {
      res.status(401);
      throw new Error("Not authenticated");
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
