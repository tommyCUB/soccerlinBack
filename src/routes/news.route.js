import express from "express";

const router = express.Router();

// Import the user controller
import newsController from "../controllers/news.controller.js";
import authController from "../controllers/auth.controller.js";

// Define routes
router.get("/", authController.verificarTokenFirebase, newsController.getNews);
router.delete(
  "/:id",
  authController.verificarTokenFirebase,
  newsController.deleteNews
);

export default router;
