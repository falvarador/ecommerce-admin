import { WorkOS } from "@workos-inc/node";

const apiKey = import.meta.env.WORKOS_API_KEY;
const clientId = import.meta.env.WORKOS_CLIENT_ID;
const cookiePassword = import.meta.env.WORKOS_COOKIE_PASSWORD;
const password = import.meta.env.WORKOS_COOKIE_PASSWORD;
const redirectUri = import.meta.env.WORKOS_REDIRECT_URI;

const workos = new WorkOS(apiKey, {
  clientId,
});

export { cookiePassword, clientId, password, redirectUri, workos };
