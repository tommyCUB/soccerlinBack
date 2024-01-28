import express from "express";
import cors from "cors";
import authRoute from "./src/routes/auth.route.js";
import genteRoute from "./src/routes/gente.route.js";
import newsRoute from "./src/routes/news.route.js";

const app = express();
const port = 4000;

// Define routes and middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);
app.use("/gente", genteRoute);
app.use("/news", newsRoute);

// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
