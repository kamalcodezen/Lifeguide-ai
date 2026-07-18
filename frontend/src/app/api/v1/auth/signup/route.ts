import { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email address format."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      "Password requires a number, a capital letter, and a special character.",
    ),
  name: z.string().min(1, "Name must be non-empty."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);
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

    const { email, password, name } = parsed.data;

    // Call Better Auth programmatic signup endpoint
    const { response, headers } = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
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
          userId: response.user.id,
          email: response.user.email,
          name: response.user.name,
        },
      },
      {
        status: 201,
        headers: responseHeaders,
      },
    );
  } catch (error) {
    const err = error as { status?: number; code?: string; message?: string };
    const message = err.message || "";
    const isDuplicate =
      message.includes("already") || err.status === 422 || err.code === "USER_ALREADY_EXISTS";

    return NextResponse.json(
      {
        success: false,
        error: {
          code: isDuplicate ? "VALIDATION_FAILED" : "INTERNAL_SERVER_ERROR",
          message: isDuplicate
            ? "Email already registered."
            : message || "An unexpected error occurred during registration.",
        },
      },
      { status: isDuplicate ? 400 : 500 },
    );
  }
}
