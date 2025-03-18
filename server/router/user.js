import express from "express";
import { validateRequest } from "../middlewares/requestValidation.js";
import userController from "../controllers/user.js";
import validateJwt from "../middlewares/jwtValidation.js";
import { signinSchema } from "../utils/validationSchemas/auth.js";

const router = express.Router();

router
  .route("/profile")
  .get(validateJwt, userController.retrieveProfile)
  .put(validateJwt, validateRequest(), userController.updateProfile)
  .delete(validateJwt, userController.deleteProfile);

router.patch("/profile/restore", validateRequest(signinSchema), userController.restoreProfile);

export default router;
