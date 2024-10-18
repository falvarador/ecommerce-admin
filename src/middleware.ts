// import { defineMiddleware } from "astro:middleware";

// import { createSessionClient } from "@/shared/app";

// export const onRequest = defineMiddleware(async ({ request, locals }, next) => {
//   try {
//     const { account } = createSessionClient(request);
//     locals.user = await account.get();
//   } catch {}

//   return next();
// });
