import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import authRouter from "./features/auth/routes/authRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// Handle Better Auth native routes
app.all("/api/auth/*", toNodeHandler(auth));

// Mount custom Version 1 API routes
app.use("/api/v1/auth", authRouter);

// Start Express server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[LifeGuide Backend] Server listening on port ${PORT}`);
});

