import {
  ActionFunctionArgs,
  json,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { Link, useFetcher } from "@remix-run/react";

import {
  createUserSession,
  login,
  LoginCredentials,
} from "~/shared/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Log in | The Mug Store" },
    { name: "description", content: "Log into your Mug Store account" },
  ];
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { ...values } = Object.fromEntries(formData);

  if (
    !values.email ||
    !values.password ||
    typeof values.email !== "string" ||
    typeof values.password != "string"
  ) {
    return json(
      { ok: false, message: "email or password incorrect" },
      { status: 422, statusText: "Fields cannot be empty!" }
    );
  }

  const user = await login(values as unknown as LoginCredentials, context);
  if (!user)
    return json(
      { ok: false, message: "Wrong credentials!" },
      { status: 400, statusText: "Wrong credentials!" }
    );

  // assign session
  return createUserSession(user.id, "/account/dashboard", context);
};

export default function Login() {
  const fetcher = useFetcher<React.ReactNode>();

  return (
    <section>
      <h1>Sign in</h1>
      {fetcher.state === "idle" && fetcher.data && (
        <div>
          <p className="p-2 text-red-700">{fetcher.data.message}</p>
        </div>
      )}

      <fetcher.Form method="post" className="pt-6 pb-8 mt-4 mb-4 space-y-3">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email address"
          aria-label="Email address"
        />
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
        <fieldset>
          <label htmlFor="remember">
            <input
              type="checkbox"
              role="switch"
              id="remember"
              name="remember"
            />
            Remember me
          </label>
        </fieldset>
        <button type="submit">Login</button>
        <Link to="/account/register">Create an account</Link>.
      </fetcher.Form>
    </section>
  );
}
