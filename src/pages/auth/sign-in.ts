import type { APIRoute } from "astro";

import { clientId, redirectUri, workos } from "@/workos";

export const GET: APIRoute = async ({ redirect }) => {
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    provider: "authkit",
    redirectUri,
    clientId,
  });

  return redirect(authorizationUrl);
};
