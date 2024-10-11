import { defineAction } from "astro:actions";

export const SignInFormAction = defineAction({
  handler: async (_, context) => {
    const { cookies } = context;

    cookies.delete("sb-access-token", { path: "/" });
    cookies.delete("sb-refresh-token", { path: "/" });
  },
});
