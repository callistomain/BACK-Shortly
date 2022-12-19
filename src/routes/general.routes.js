import { Router } from "express";
import { ranking } from "../controllers/general.controllers.js";

const router = Router();

router.get("/ranking", ranking);

export default router;
