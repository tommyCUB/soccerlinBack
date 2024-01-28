import express from "express";

const router = express.Router();

// Import the user controller
import authController from "../controllers/auth.controller.js";

// Define routes
router.post(
  "/login",
  authController.verificarTokenFirebase,
  authController.login
);

// Export the router
export default router;
