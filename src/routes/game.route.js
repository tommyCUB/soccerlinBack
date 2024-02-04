import { Router } from "express";

import gameController from "../controllers/game.controller.js";

const router = Router();

router.get("/results", gameController.getGamesByTeam);

router.get("/total", gameController.getTotalGamesByTeam);

export default router;
