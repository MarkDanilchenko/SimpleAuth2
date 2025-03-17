import express from "express";
import { validateRequest } from "../middlewares/requestValidation.js";
import userController from "../controllers/user.js";
import validateJwt from "../middlewares/jwtValidation.js";

const router = express.Router();

router
  .route("/profile")
  .get(validateJwt, userController.retrieveProfile)
  .patch(validateJwt, validateRequest(), userController.updateProfile)
  .delete(validateJwt, userController.deleteProfile);

router.patch("profile/:id/restore", validateRequest(), userController.restoreProfile);

export default router;
