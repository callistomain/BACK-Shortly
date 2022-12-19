import { Router } from "express";
import { ranking } from "../controllers/general.routes.js";

const router = Router();

router.get("/ranking", ranking);

export default router;
