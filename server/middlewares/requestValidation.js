import { z } from "zod";
import { badRequestError } from "../utils/errors.js";
import fs from "fs";
import { logger } from "../server.js";

function validateRequest(schema) {
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
        files: req.files,
      });

      next();
    } catch (error) {
      if (req.files) {
        Object.values(req.files).forEach((file) => {
          fs.unlink(file[0].path, (error) => {
            if (error) {
              logger.error(error.message);
            }
          });
        });
      }
      if (error instanceof z.ZodError) {
        return badRequestError(res, error.issues[0].message);
      }

      badRequestError(res, error.message);
    }
  };
}

export { validateRequest };
