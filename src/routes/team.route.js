import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import teamController from "../controllers/team.controller.js";

const router = Router();

router.get("/", authController.verificarTokenFirebase, teamController.getTeam);
router.put(
  "/",
  authController.verificarTokenFirebase,
  teamController.updateTeam
);

router.get(
  "/email",
  authController.verificarTokenFirebase,
  teamController.getTeamByEmail
);

router.get(
  "/history",
  authController.verificarTokenFirebase,
  teamController.getTeamHistory
);

router.get(
  "/stats",
  authController.verificarTokenFirebase,
  teamController.getTeamStats
);

router.put(
  "/stamp",
  authController.verificarTokenFirebase,
  teamController.updateStamp
);

router.get(
  "/total",
  authController.verificarTokenFirebase,
  teamController.getTotalTeam
);

export default router;
