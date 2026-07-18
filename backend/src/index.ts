import "dotenv/config";
import express from "express";
import cors from "cors";
import { z } from "zod";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

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

// Custom Auth validation schemas
const signupSchema = z.object({
  email: z.string().email("Invalid email address format."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      "Password requires a number, a capital letter, and a special character."
    ),
  name: z.string().min(1, "Name must be non-empty."),
});

const signinSchema = z.object({
  email: z.string().email("Invalid email address format."),
  password: z.string().min(1, "Password is required."),
});

// Custom API Sign-Up Route
app.post("/api/v1/auth/signup", async (req, res) => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_FAILED",
          message: "One or more input values are invalid.",
          details: parsed.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
      });
    }

    const { email, password, name } = parsed.data;

    // Call Better Auth signup endpoint
    const signUpResult = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
      returnHeaders: true,
    });

    const setCookie = signUpResult.headers.get("set-cookie");
    if (setCookie) {
      res.setHeader("set-cookie", setCookie);
    }

    return res.status(201).json({
      success: true,
      data: {
        userId: signUpResult.response.user.id,
        email: signUpResult.response.user.email,
        name: signUpResult.response.user.name,
      },
    });
  } catch (error) {
    const err = error as { status?: number; code?: string; message?: string };
    const message = err.message || "";
    const isDuplicate =
      message.includes("already") || err.status === 422 || err.code === "USER_ALREADY_EXISTS";

    return res.status(isDuplicate ? 400 : 500).json({
      success: false,
      error: {
        code: isDuplicate ? "VALIDATION_FAILED" : "INTERNAL_SERVER_ERROR",
        message: isDuplicate
          ? "Email already registered."
          : message || "An unexpected error occurred during registration.",
      },
    });
  }
});

// Custom API Sign-In Route
app.post("/api/v1/auth/signin", async (req, res) => {
  try {
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_FAILED",
          message: "One or more input values are invalid.",
          details: parsed.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        },
      });
    }

    const { email, password } = parsed.data;

    const signInResult = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      returnHeaders: true,
    });

    const setCookie = signInResult.headers.get("set-cookie");
    if (setCookie) {
      res.setHeader("set-cookie", setCookie);
    }

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: signInResult.response.user.id,
          email: signInResult.response.user.email,
        },
      },
    });
  } catch (error) {
    const err = error as { status?: number; message?: string };
    const status = err.status === 401 || err.status === 403 ? 401 : 500;
    const code = status === 401 ? "UNAUTHENTICATED" : "INTERNAL_SERVER_ERROR";
    const message =
      status === 401
        ? "Invalid credentials."
        : err.message || "An unexpected error occurred during sign-in.";

    return res.status(status).json({
      success: false,
      error: {
        code,
        message,
      },
    });
  }
});

// Custom API Sign-Out Route
app.post("/api/v1/auth/signout", async (req, res) => {
  try {
    // Better Auth needs headers object to load session
    const requestHeaders = new Headers();
    Object.entries(req.headers).forEach(([key, val]) => {
      if (val) {
        requestHeaders.set(key, Array.isArray(val) ? val.join(", ") : val);
      }
    });

    const session = await auth.api.getSession({
      headers: requestHeaders,
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHENTICATED",
          message: "Missing or expired session cookie.",
        },
      });
    }

    const signOutResult = await auth.api.signOut({
      headers: requestHeaders,
      returnHeaders: true,
    });

    const setCookie = signOutResult.headers.get("set-cookie");
    if (setCookie) {
      res.setHeader("set-cookie", setCookie);
    }

    return res.status(200).json({
      success: true,
      meta: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred during sign-out.";
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message,
      },
    });
  }
});

// Custom API Get-Session (Me) Route
app.get("/api/v1/auth/me", async (req, res) => {
  try {
    const requestHeaders = new Headers();
    Object.entries(req.headers).forEach(([key, val]) => {
      if (val) {
        requestHeaders.set(key, Array.isArray(val) ? val.join(", ") : val);
      }
    });

    const session = await auth.api.getSession({
      headers: requestHeaders,
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHENTICATED",
          message: "Missing or expired session cookie.",
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred while retrieving session.";
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message,
      },
    });
  }
});

// Start Express server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[LifeGuide Backend] Server listening on port ${PORT}`);
});
