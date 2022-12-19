import { Router } from "express";
import { userInfo } from "../controllers/users.controllers.js";
import { tokenValidation } from "../middlewares/token.middleware.js";

const router = Router();

router.get("/users/me", tokenValidation, userInfo);

export default router;
