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
    const helmet = (await import("helmet")).default;
    const { toNodeHandler } = await import("better-auth/node");
    const { auth } = await import("./lib/auth");
    const authRouter = (await import("./features/auth/routes/authRoutes")).default;
    const profileRouter = (await import("./features/profile/routes/profileRoutes")).default;
    const roadmapRouter = (await import("./features/roadmap/routes/roadmapRoutes")).default;
    const projectsRouter = (await import("./features/projects/routes/projectRoutes")).default;
    const exploreRouter = (await import("./features/projects/routes/exploreRoutes")).default;
    const assessmentRouter = (await import("./features/assessment/routes/assessmentRoutes")).default;
    const aiRouter = (await import("./features/ai/routes/aiRoutes")).default;
    const itemsRouter = (await import("./features/items/routes/itemRoutes")).default;
    const { notFound } = await import("./middlewares/notFound");
    const { errorHandler } = await import("./middlewares/errorHandler");

    const app = express();
    const PORT = env.PORT;

    // Security headers
    app.use(helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false, // CSP managed by Next.js headers
    }));

    app.use(
      cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
      })
    );

    app.use(express.json());

    // Handle Better Auth native routes
    app.all("/api/auth/*", toNodeHandler(auth));

    // Mount custom Version 1 API routes
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/profile", profileRouter);
    app.use("/api/v1/roadmaps", roadmapRouter);
    app.use("/api/v1/projects", projectsRouter);
    app.use("/api/v1/explore", exploreRouter);
    app.use("/api/v1/assessments", assessmentRouter);
    app.use("/api/v1/ai", aiRouter);
    app.use("/api/v1/items", itemsRouter);

    // Global error handler middlewares
    app.use(notFound as any);
    app.use(errorHandler as any);

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
