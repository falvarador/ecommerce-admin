import { AppLoadContext } from "@remix-run/cloudflare";

const prodURL = "https://remix-cloudflare-workers.blissmo.workers.dev";

export const getExtraData = (
  access_token: string
): Promise<Record<string, unknown>> => {
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";
  return fetch(url, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  })
    .then((r) => r.json())
    .catch((e) => ({ ok: false, error: e })) as Promise<
    Record<string, unknown>
  >;
};

export const getAccessToken = async (
  context: AppLoadContext,
  code: string
): Promise<Record<string, unknown> | Error> => {
  const env = context.cloudflare.env as unknown as Env;
  const { GOOGLE_SECRET, GOOGLE_CLIENT_ID, ENV } = env;

  if (!GOOGLE_SECRET || !GOOGLE_CLIENT_ID)
    return Promise.reject(new Error("missing env object"));
  const url =
    "https://oauth2.googleapis.com/token?" +
    new URLSearchParams({
      code,
      client_secret: GOOGLE_SECRET,
      grant_type: "authorization_code",
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: ENV === "development" ? "http://localhost:5173" : prodURL,
      scope: "https://www.googleapis.com/auth/userinfo.email",
    });
  return fetch(url, {
    method: "post",
    headers: { "content-type": "application/json" },
  })
    .then((r) => r.json())
    .catch((e) => ({ ok: false, error: e })) as Promise<
    Record<string, unknown>
  >;
};

export function redirectToGoogle<Redirect extends (arg0: string) => Response>(
  context: AppLoadContext,
  redirect: Redirect
): Response {
  const env = context.cloudflare.env as unknown as Env;
  const { GOOGLE_SECRET, GOOGLE_CLIENT_ID, ENV } = env;

  if (!GOOGLE_SECRET || !GOOGLE_CLIENT_ID) {
    throw new Error("Missing env variables");
  }
  const obj = {
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: ENV === "development" ? "http://localhost:5173" : prodURL,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/userinfo.email",
  };
  const url =
    "https://accounts.google.com/o/oauth2/auth?" + new URLSearchParams(obj);
  return redirect(url);
}
