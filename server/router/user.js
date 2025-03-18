import express from "express";
import { validateRequest } from "../middlewares/requestValidation.js";
import userController from "../controllers/user.js";
import validateJwt from "../middlewares/jwtValidation.js";
import { restoreUserSchema, updateUserSchema } from "../utils/validationSchemas/user.js";
import { uploadAvatar } from "../utils/multerConfig.js";

const router = express.Router();

router
  .route("/profile")
  .get(validateJwt, userController.retrieveProfile)
  .put(
    validateJwt,
    uploadAvatar.fields([{ name: "avatar", maxCount: 1 }]),
    validateRequest(updateUserSchema),
    userController.updateProfile
  )
  .delete(validateJwt, userController.deleteProfile);

router.patch("/profile/restore", validateRequest(restoreUserSchema), userController.restoreProfile);

export default router;
