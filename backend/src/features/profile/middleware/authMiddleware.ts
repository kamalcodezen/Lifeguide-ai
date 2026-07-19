import type { Request, Response, NextFunction } from "express";
import { auth } from "../../../lib/auth";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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

    req.user = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    };

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "Authentication middleware failed.",
      },
    });
  }
};
