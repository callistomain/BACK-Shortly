import { Router } from "express";
import { getUrlById, shorten } from "../controllers/urls.controller.js";
import { tokenValidation } from "../middlewares/token.middleware.js";
import { urlSchemaValidation } from "../middlewares/urls.middleware.js";

const router = Router();

router.post("/urls/shorten", tokenValidation, urlSchemaValidation, shorten);
router.get("/urls/:id", getUrlById);

export default router;
