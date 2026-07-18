import { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const signinSchema = z.object({
  email: z.string().email("Invalid email address format."),
  password: z.string().min(1, "Password is required."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = signinSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "One or more input values are invalid.",
            details: parsed.error.issues.map((issue) => ({
              path: issue.path.join("."),
              message: issue.message,
            })),
          },
        },
        { status: 400 },
      );
    }

    const { email, password } = parsed.data;

    // Call Better Auth programmatic signin endpoint
    const { response, headers } = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      returnHeaders: true,
    });

    const responseHeaders = new Headers();
    const setCookie = headers.get("set-cookie");
    if (setCookie) {
      responseHeaders.set("set-cookie", setCookie);
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          user: {
            id: response.user.id,
            email: response.user.email,
          },
        },
      },
      {
        status: 200,
        headers: responseHeaders,
      },
    );
  } catch (error) {
    const err = error as { status?: number; message?: string };
    const status = err.status === 401 || err.status === 403 ? 401 : 500;
    const code = status === 401 ? "UNAUTHENTICATED" : "INTERNAL_SERVER_ERROR";
    const message =
      status === 401
        ? "Invalid credentials."
        : err.message || "An unexpected error occurred during sign-in.";

    return NextResponse.json(
      {
        success: false,
        error: {
          code,
          message,
        },
      },
      { status },
    );
  }
}
