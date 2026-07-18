import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const requestHeaders = await headers();
    const session = await auth.api.getSession({
      headers: requestHeaders,
    });

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHENTICATED",
            message: "Missing or expired session cookie.",
          },
        },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred while retrieving session.";
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message,
        },
      },
      { status: 500 },
    );
  }
}
