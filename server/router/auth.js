import express from "express";
import { validateRequest } from "../middlewares/requestValidation.js";
import { signinSchema, signupSchema } from "../utils/validationSchemas/auth.js";
import authController from "../controllers/auth.js";
import { uploadAvatar } from "../utils/multerConfig.js";

const router = express.Router();

router.post(
  "/signup",
  uploadAvatar.fields([{ name: "avatar", maxCount: 1 }]),
  validateRequest(signupSchema),
  authController.signup
);
router.get("/signin", validateRequest(signinSchema), authController.signin);
// router.post("/signout");

// // http://127.0.0.1:3000/api/v1/signout
// router
//   .route("/signout")
//   .post(
//     [header("Authorization", "Bearer refresh token should be provided!").exists()],
//     routes_validation,
//     AuthController.signout
//   );

// // http://127.0.0.1:3000/api/v1/refresh
// router
//   .route("/refresh")
//   .get(
//     [header("Authorization", "Bearer refresh token should be provided!").exists()],
//     routes_validation,
//     AuthController.refresh
//   );

// // http://127.0.0.1:3000/api/v1/profile/:id
// router
//   .route("/profile/:id")
//   .get([param("id").isInt({ min: 1 })], routes_validation, UsersDataController.getExactUser)
//   .put(
//     // multer_config.any() is set up in this place,
//     // because we need to upload multiple data from the request, which is sended with multipart/form-data
//     multer_config.any(),
//     [
//       check("first_name", "FirstName should be min 2 characters and must contain only letters!").custom((value) => {
//         if (value !== undefined) {
//           return value.match(/^[a-zA-Z]{2,}$/gi);
//         }
//         return true;
//       }),
//       check("last_name", "LastName should be min 2 characters and must contain only letters!").custom((value) => {
//         if (value !== undefined) {
//           return value.match(/^[a-zA-Z]{2,}$/gi);
//         }
//         return true;
//       }),
//       check("email", "Email should be valid!").custom((value) => {
//         if (value !== undefined) {
//           return value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gi);
//         }
//         return true;
//       }),
//       check("gender", "Gender should be male or female!").custom((value) => {
//         if (value !== undefined) {
//           return value.match(/^(male|female)$/gi);
//         }
//         return true;
//       }),
//       param("id").isInt({ min: 1 }),
//     ],
//     routes_validation,
//     jwt_verification,
//     UsersDataController.updateUser
//   );

export default router;
