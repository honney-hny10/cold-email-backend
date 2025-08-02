import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import campaignRoutes from "./routes/campaignRoutes";

const app = express();
app.use(express.json());

// This connects /campaigns to your router
app.use("/campaigns", campaignRoutes);

AppDataSource.initialize().then(() => {
  console.log("Database connected");

  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });

  app.get("/", (req, res) => {
    res.send("Hello! Server is up and running.");
  });
});
