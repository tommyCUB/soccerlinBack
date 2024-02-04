import express from "express";
import cors from "cors";
import authRoute from "./src/routes/auth.route.js";
import genteRoute from "./src/routes/gente.route.js";
import newsRoute from "./src/routes/news.route.js";
import teamRoute from "./src/routes/team.route.js";
import gameRoute from "./src/routes/game.route.js";
import rankingRoute from "./src/routes/ranking.route.js";
import authController from "./src/controllers/auth.controller.js";

const app = express();
const port = 4000;

// Define routes and middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);
app.use("/gente", authController.verificarTokenFirebase, genteRoute);
app.use("/news", authController.verificarTokenFirebase, newsRoute);
app.use("/team", authController.verificarTokenFirebase, teamRoute);
app.use("/game", authController.verificarTokenFirebase, gameRoute);
app.use("/ranking", authController.verificarTokenFirebase, rankingRoute);

// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
