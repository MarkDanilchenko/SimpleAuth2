import { expressOptions } from "../env.js";
import { unauthorizedError } from "../utils/errors.js";
import jwt from "jsonwebtoken";

export default function validateJwt(req, res, next) {
  const accessToken = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!accessToken) {
    return unauthorizedError(res, "Access token not found!");
  }

  jwt.verify(accessToken, expressOptions.jwtSecret, (error) => {
    if (error) {
      return unauthorizedError(res, "Access token is not valid!");
    }

    next();
  });
}
