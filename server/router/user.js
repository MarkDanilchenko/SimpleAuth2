import express from "express";
import { validation } from "../middlewares/validation.js";
import { getUserSchema, updateUserSchema } from "../utils/validationSchemas/user.js";

const router = express.Router();

router.route("/users/:id").get(validation(getUserSchema)).patch(validation(updateUserSchema));

export default router;
