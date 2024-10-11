import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import { supabase } from "@/shared/supabase";

export const SignInFormAction = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email({
      message: "The email address is badly formatted.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long.",
      })
      .max(16, {
        message: "Password must be at most 16 characters long.",
      }),
  }),
  handler: async ({ email, password }, context) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    const { access_token, refresh_token } = data.session;
    const { cookies } = context;

    cookies.set("sb-access-token", access_token, {
      path: "/",
    });
    cookies.set("sb-refresh-token", refresh_token, {
      path: "/",
    });
  },
});
