import { Router } from "express";
import { shorten } from "../controllers/urls.controller.js";
import { tokenValidation } from "../middlewares/token.middleware.js";
import { urlSchemaValidation } from "../middlewares/urls.middleware.js";

const router = Router();

router.post("/urls/shorten", tokenValidation, urlSchemaValidation, shorten);

export default router;
