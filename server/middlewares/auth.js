import jwt from "jsonwebtoken";
import { adminSecretKey } from "../app.js";
import { ErrorHandler } from "../utils/utility.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["chatly-token"];
  if (!token)
    return next(new ErrorHandler("Please login to access this route", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodedData._id;

  next();
};

const adminOnly = (req, res, next) => {
  const token = req.cookies["chatly-admin-token"];
  if (!token)
    return next(new ErrorHandler("Only Admin can access this route", 401));

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched)
    return next(new ErrorHandler("Only Admin can access this route", 401));

  next();
};

export { adminOnly, isAuthenticated };
