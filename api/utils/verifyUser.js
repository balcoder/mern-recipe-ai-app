import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // need to install cookie-parser in backend and add in index.js
  // get token from the stored cookie
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));

  //verify the id in cookie and send to next if correct
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    req.user = user;
    next();
  });
};
