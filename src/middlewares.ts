import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import httpStatus from "http-status";
import { AnyZodObject } from "zod";

export const notFoundHandler: RequestHandler = (_req, res, next) => {
  const err = new Error("Not Found");
  res.status(httpStatus.NOT_FOUND);
  next(err);
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (res.statusCode === httpStatus.OK) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }

  res.json({
    error: {
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? "" : err.stack,
    },
  });
};

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      res.status(400);
      return next(new Error(JSON.stringify(error.format())));
    }
  };
