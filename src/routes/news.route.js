import express from "express";

// Import the user controller
import newsController from "../controllers/news.controller.js";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

// Define routes
router.get("/", authController.verificarTokenFirebase, newsController.getNews);
router.delete(
  "/:id",
  authController.verificarTokenFirebase,
  newsController.deleteNews
);

export default router;
