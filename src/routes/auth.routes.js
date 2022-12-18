import { Router } from "express";
import { signup } from "../controllers/auth.controllers.js";
import { signupSchemaValidation } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signupSchemaValidation, signup);

export default router;
