import {
  json,
  redirect,
  MetaFunction,
  ActionFunctionArgs,
} from "@remix-run/cloudflare";
import { useFetcher, Link as RemixLink } from "@remix-run/react";

import { authHandler } from "~/features/auth/auth.handler.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Sing up | eCommerce Admin" },
    {
      name: "description",
      content: "Sing up a new account in eCommerce Admin",
    },
  ];
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const { signUp } = authHandler();

  const formData = await request.formData();
  const { ...values } = Object.fromEntries(formData);

  if (
    !values.email ||
    !values.password ||
    !values.password_repeat ||
    !values.first_name ||
    !values.last_name ||
    !values.phone ||
    typeof values.email !== "string" ||
    typeof values.password != "string" ||
    typeof values.password_repeat != "string" ||
    typeof values.first_name != "string" ||
    typeof values.last_name != "string" ||
    typeof values.phone != "string"
  ) {
    return json(
      { ok: false, message: "Fields cannot be empty!" },
      { status: 422, statusText: "Incomplete form!" }
    );
  }

  // * Validate email
  const emailRgx =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  if (!emailRgx.test(values.email as string)) {
    return json(
      { ok: false, message: "Provide a valid email!" },
      { status: 422, statusText: "Provide a valid email!" }
    );
  }

  if (values.password !== values.password_repeat) {
    return json(
      { ok: false, message: "Passwords don't match!" },
      { status: 422, statusText: "Passwords don't match!" }
    );
  }

  const accountCreation = await signUp(
    {
      firstName: values.first_name,
      lastName: values.last_name,
      email: values.email,
      password: values.password,
      phone: values.phone,
    },
    context
  );

  if (accountCreation.user) {
    return redirect("/signin");
  }

  return json(
    { fields: values },
    { status: 500, statusText: accountCreation.message }
  );
};

export default function Register() {
  const fetcher = useFetcher<React.ReactNode>();

  return (
    <section>
      <h2>Create an Account</h2>
      <fetcher.Form method="post">
        <label htmlFor="first_name">First Name *</label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          autoComplete="given-name"
          required
          aria-label="Firt name"
          placeholder="Enter your first name"
        />
        <label htmlFor="last_name">Last Name *</label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          autoComplete="additional-name"
          required
          aria-label="Last name"
          placeholder="Enter your last name"
        />
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="mobile tel-local-prefix webauthn"
          aria-label="Phone"
          placeholder="Enter your phone number"
        />

        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-label="Email address"
          placeholder="Enter your email address"
        />

        <label htmlFor="password">Password *</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          aria-label="Password"
          minLength={8}
          required
        />
        <label htmlFor="password_repeat">Repeat Password *</label>
        <input
          id="password_repeat"
          name="password_repeat"
          type="password"
          autoComplete="current-password"
          placeholder="Repeat Password"
          aria-label="Repeat Password"
          minLength={8}
          required
        />
        <RemixLink to="/signin">Have an account?</RemixLink>
        <button type="submit">Sign up</button>
      </fetcher.Form>
    </section>
    // <div className="flex justify-center my-24 px-4">
    //   <div className="max-w-md w-full">
    //     <h1 className="text-4xl">Create an Account.</h1>
    //     <code>{JSON.stringify(fetcher.data)}</code>
    //     {fetcher.state === "idle" && fetcher.data && (
    //       <div className="flex items-center justify-center my-3 bg-red-100">
    //         <p className="p-2 text-red-700">{fetcher.data.message}</p>
    //       </div>
    //     )}
  );
}
