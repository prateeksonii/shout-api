import { ErrorRequestHandler, RequestHandler } from "express";
import httpStatus from "http-status";

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
