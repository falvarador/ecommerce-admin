import {
  AppLoadContext,
  createCookieSessionStorage,
} from "@remix-run/cloudflare";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

interface CookiesEnv {
  SESSION_SECRET: string;
}

export function createCookieSession(context: AppLoadContext) {
  const env = context.cloudflare.env as unknown as CookiesEnv;
  const { SESSION_SECRET } = env;

  const { getSession, commitSession, destroySession } =
    createCookieSessionStorage<SessionData, SessionFlashData>({
      // A cookie from `createCookie` or the cookieOptions to create one
      cookie: {
        name: "__session",

        // all of these are optional
        // domain: "remix.run",
        // Expires can also be set (although maxAge overrides it when used in combination).
        // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
        //
        // expires: new Date(Date.now() + 60_000),
        httpOnly: true,
        maxAge: 7 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secrets: [SESSION_SECRET?.trim()],
        secure: true,
      },
    });

  return { getSession, commitSession, destroySession };
}
