import express from "express";

const router = express.Router();

// Import the user controller
import genteController from "../controllers/gente.controller.js";
import authController from "../controllers/auth.controller.js";

// Define routes
router.get(
  "/detail",
  authController.verificarTokenFirebase,
  genteController.getGente
);

export default router;
