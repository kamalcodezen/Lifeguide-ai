import type { Request, Response } from "express";
import { auth } from "../../../lib/auth";
import { signupSchema, signinSchema } from "../validation/authValidation";

const setAuthCookies = (headers: Headers, res: Response) => {
  if (typeof headers.getSetCookie === "function") {
    const cookies = headers.getSetCookie();
    if (cookies.length > 0) {
      res.setHeader("set-cookie", cookies);
    }
  } else {
    const setCookie = headers.get("set-cookie");
    if (setCookie) {
      res.setHeader("set-cookie", setCookie);
    }
  }
};

export const signUpController = async (req: Request, res: Response) => {
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

    setAuthCookies(signUpResult.headers, res);

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
};

export const signInController = async (req: Request, res: Response) => {
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

    setAuthCookies(signInResult.headers, res);

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
};

export const signOutController = async (req: Request, res: Response) => {
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

    setAuthCookies(signOutResult.headers, res);

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
};

export const getMeController = async (req: Request, res: Response) => {
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
};
