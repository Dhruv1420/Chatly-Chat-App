import { envMode } from "../app.js";

const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  if (err.code === 11000) {
    const error = Object.keys(err.keyPattern).join(",");
    err.message = `Duplicate Field - ${error}`;
    err.statusCode = 400;
  }

  if (err.name === "CastError") {
    err.message = `Invalid Format of ${err.path}`;
    err.statusCode = 400;
  }

  return res.status(err.statusCode).json({
    status: false,
    message: envMode === "DEVELOPMENT" ? err : err.message,
  });
};

const TryCatch = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (err) {
    next(err);
  }
};

export { errorMiddleware, TryCatch };
