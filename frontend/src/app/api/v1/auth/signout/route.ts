import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
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

    const { headers: responseHeaders } = await auth.api.signOut({
      headers: requestHeaders,
      returnHeaders: true,
    });

    const customHeaders = new Headers();
    const setCookie = responseHeaders.get("set-cookie");
    if (setCookie) {
      customHeaders.set("set-cookie", setCookie);
    }

    return NextResponse.json(
      {
        success: true,
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      {
        status: 200,
        headers: customHeaders,
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred during sign-out.";
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
