import "dotenv/config";
import "./config/env"; // Trigger env validation immediately
import { dbConnect } from "./database/connection/dbConnect";
import { env } from "./config/env";

const startServer = async () => {
  try {
    // 1. Establish database connection before importing or executing auth dependencies
    await dbConnect();
    // eslint-disable-next-line no-console
    console.log("[MongoDB] Successfully Connected to Atlas");

    // 2. Dynamically import modules after active database connection is resolved
    const express = (await import("express")).default;
    const cors = (await import("cors")).default;
    const { toNodeHandler } = await import("better-auth/node");
    const { auth } = await import("./lib/auth");
    const authRouter = (await import("./features/auth/routes/authRoutes")).default;

    const app = express();
    const PORT = env.PORT;

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

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`[LifeGuide Backend] Server listening on port ${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
