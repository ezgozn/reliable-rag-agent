import type { ErrorRequestHandler } from "express";

type AppError = Error & {
  status?: number;
};

const errorHandler: ErrorRequestHandler = (err: AppError, _req, res, _next) => {
  const status = err.status ?? 500;

  res.status(status).json({
    error: {
      message: err.message || "Internal server error",
      status,
    },
  });
};

export default errorHandler;
