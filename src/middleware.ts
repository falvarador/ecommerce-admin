import { defineMiddleware } from "astro:middleware";

import { password, workos } from "@/workos";

export const onRequest = defineMiddleware(
  async ({ cookies, locals, redirect, url }, next) => {
    if (!url.pathname.includes("/dashboard")) {
      return next();
    }

    const cookie = cookies.get("wos-session");

    if (!cookie?.value) {
      return redirect("/auth/sign-in");
    }

    const session = workos.userManagement.loadSealedSession({
      sessionData: cookie?.value,
      cookiePassword: password,
    });

    // @ts-ignore
    const { authenticated, user, reason } = await session.authenticate();

    if (authenticated) {
      locals.user = user;
      return next();
    }

    // If the cookie is missing, redirect to login
    if (reason === "no_session_cookie_provided") {
      return redirect("/auth/sign-in");
    }

    // If the session is invalid, attempt to refresh
    try {
      // @ts-ignore
      const { authenticated, session, sealedSession } = await session.refresh();

      if (!authenticated) {
        return redirect("/auth/sign-in");
      }

      // Update the cookie
      cookies.set("wos-session", sealedSession!, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        // maxAge: 60 * 60 * 24 * 30,
      });

      locals.user = session.user;

      // Redirect to the same route to ensure the updated cookie is used
      return redirect(url.pathname);
    } catch (e) {
      // Failed to refresh access token, redirect user to login page after deleting the cookie
      cookies.delete("wos-session", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      return redirect("/auth/sign-in");
    } finally {
      return next();
    }
  }
);
