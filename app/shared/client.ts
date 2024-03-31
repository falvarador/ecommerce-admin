import { createClient } from "@libsql/client/http";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../../drizzle/schema";
import type { AppLoadContext } from "@remix-run/cloudflare";

export function buildDbClient(context: AppLoadContext) {
  const env = context.cloudflare.env as unknown as Env;
  const { TURSO_DB_URL, TURSO_DB_AUTH_TOKEN } = env;

  const url = TURSO_DB_URL?.trim();
  const authToken = TURSO_DB_AUTH_TOKEN?.trim();

  if (url === undefined) {
    throw new Error("TURSO_DB_URL is not defined");
  }

  if (authToken === undefined) {
    throw new Error("TURSO_DB_AUTH_TOKEN is not defined");
  }

  return drizzle(createClient({ url, authToken }), { schema });
}
