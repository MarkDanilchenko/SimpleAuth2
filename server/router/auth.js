import express from "express";
import { validateRequest } from "../middlewares/requestValidation.js";
import { signinSchema, signupSchema } from "../utils/validationSchemas/auth.js";
import authController from "../controllers/auth.js";
import { uploadAvatar } from "../utils/multerConfig.js";
import validateJwt from "../middlewares/jwtValidation.js";

const router = express.Router();

router.post(
  "/signup",
  uploadAvatar.fields([{ name: "avatar", maxCount: 1 }]),
  validateRequest(signupSchema),
  authController.signup
);
router.get("/signin", validateRequest(signinSchema), authController.signin);
router.post("/signout", validateJwt, authController.signout);
router.post("/refresh", authController.refresh); // presence of access token is checked in controller

export default router;
