import { z } from "zod";
import { badRequestError } from "../utils/errors.js";

function validation(schema) {
  return (req, res, next) => {
    try {
      if (req.body) {
        schema.body.parse(req.body);
      }
      if (req.params) {
        schema.params.parse(req.params);
      }
      if (req.query) {
        schema.query.parse(req.query);
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return badRequestError(res, error.issues[0].message);
      }

      badRequestError(res, error.message);
    }
  };
}

export { validation };
