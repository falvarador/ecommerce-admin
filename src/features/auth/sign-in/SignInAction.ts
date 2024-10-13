import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

// import { app } from "@/shared/app";

export const SignInAction = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email({
      message: "The email address is badly formatted.",
    }),
  }),
  handler: async ({ email }, context) => {
    // Create a magic URL token for the user with the provided email address and redirect them to the URL.
    // The unique() method generates a unique ID for the user.  The phrase parameter is optional and can be used.
    console.log(email);
  },
});
