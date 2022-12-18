import { Router } from "express";
import { signin, signup } from "../controllers/auth.controllers.js";
import { signinSchemaValidation, signupSchemaValidation } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signupSchemaValidation, signup);
router.post("/signin", signinSchemaValidation, signin);

export default router;
