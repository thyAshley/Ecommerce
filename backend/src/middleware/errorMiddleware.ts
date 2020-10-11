import express, { Response, NextFunction, Request } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  next(new Error("Api cannot be found"));
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
