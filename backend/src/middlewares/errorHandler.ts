import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { env } from "../config/env";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let code = err.code || "INTERNAL_SERVER_ERROR";
  let message = err.message || "An unexpected error occurred.";
  let details = err.details || undefined;

  // Handle Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    code = "VALIDATION_FAILED";
    message = "One or more input values are invalid.";
    details = Object.values(err.errors).map((item: any) => ({
      path: item.path,
      message: item.message,
    }));
  }

  // Handle Mongoose Cast Error (e.g. invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    code = "BAD_REQUEST";
    message = `Invalid format for field '${err.path}'.`;
  }

  // Handle MongoDB Duplicate Key Error (code 11000)
  if (err.code === 11000) {
    statusCode = 400;
    code = "BAD_REQUEST";
    const keys = Object.keys(err.keyValue || {});
    message = `Duplicate entry for field${keys.length > 1 ? "s" : ""}: ${keys.join(", ")}.`;
  }

  // Handle Zod Error
  if (err.name === "ZodError" || err.issues) {
    statusCode = 400;
    code = "VALIDATION_FAILED";
    message = "One or more input values are invalid.";
    details = err.issues.map((issue: any) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
  }

  // Handle Better Auth errors passing status codes
  if (err.status && !err.statusCode) {
    statusCode = err.status;
  }

  const isProduction = env.NODE_ENV === "production";

  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
      ...(!isProduction ? { stack: err.stack } : {}),
    },
  });
};
