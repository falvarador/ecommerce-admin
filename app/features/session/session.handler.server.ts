import { AppLoadContext, redirect } from "@remix-run/cloudflare";

import { createCookieSession } from "~/shared/cookie.session";

export function sessionHandler() {
  const createUserSession = async (
    context: AppLoadContext,
    redirectUrl: string,
    userId: string
  ) => {
    const { getSession, commitSession } = createCookieSession(context);
    const session = await getSession();
    session.set("userId", userId);

    return redirect(redirectUrl, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  };

  const destroyUserSession = async (
    context: AppLoadContext,
    redirectUrl: string
  ) => {
    const { getSession, destroySession } = createCookieSession(context);
    const session = await getSession();

    return redirect(redirectUrl, {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  };

  const validateUserSession = async (
    context: AppLoadContext,
    request: Request,
    redirectTo?: string
  ) => {
    const { getSession } = createCookieSession(context);
    const session = await getSession(request.headers.get("Cookie"));
    const userId = session.get("userId");
    if (!userId) {
      const searchParams = new URLSearchParams([["redirectTo", redirectTo!]]);
      redirect(`/login?${searchParams}`);
    }
    return userId;
  };

  return {
    createUserSession,
    destroyUserSession,
    validateUserSession,
  };
}
