import type { APIRoute } from "astro";

import { password, workos } from "@/workos";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  const cookie = cookies.get("wos-session");

  if (!cookie?.value) {
    return redirect("/auth/sign-in");
  }

  const session = workos.userManagement.loadSealedSession({
    sessionData: cookie?.value,
    cookiePassword: password,
  });

  const logoutUrl = await session.getLogoutUrl();

  cookies.delete("wos-session", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });

  return redirect(logoutUrl);
};
