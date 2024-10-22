import type { APIRoute } from "astro";

import { cookiePassword, clientId, workos } from "@/workos";

export const GET: APIRoute = async ({ cookies, redirect, request }) => {
  const code = new URL(request.url).searchParams.get("code")?.toString();

  if (!code) {
    return new Response("No code provided", { status: 400 });
  }

  try {
    const authenticateResponse =
      await workos.userManagement.authenticateWithCode({
        code,
        clientId,
        session: {
          sealSession: true,
          cookiePassword,
        },
      });

    const { sealedSession } = authenticateResponse;

    cookies.set("wos-session", sealedSession!, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      // maxAge: 60 * 60 * 24 * 30,
    });

    return redirect("/dashboard");
  } catch (error) {
    return redirect("/auth/sign-in");
  }
};
