import {
  ActionFunctionArgs,
  json,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { Form, Link } from "@remix-run/react";

import { authHandler } from "~/features/auth/auth.handler.server";
import { LoginRequest } from "~/features/auth/auth.request.server";
import { sessionHandler } from "~/features/session/session.handler.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Sing in | eCommerce Admin" },
    { name: "description", content: "Sing in your eCommerce Admin account" },
  ];
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const { signIn } = authHandler();
  const { createUserSession } = sessionHandler();

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

  const user = await signIn(values as unknown as LoginRequest, context);
  if (!user)
    return json(
      { ok: false, message: "Wrong credentials!" },
      { status: 400, statusText: "Wrong credentials!" }
    );

  // Assign session
  return createUserSession(context, "/dashboard", user.id);
};

export default function SignIn() {
  return (
    <section className="section">
      <h2 className="title">Sign in</h2>
      <Form method="post">
        <fieldset className="field">
          <label className="label" htmlFor="email">
            Email
          </label>
          <div className="control">
            <input
              className="input"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-label="Email address"
              placeholder="Enter your email address"
            />
          </div>
        </fieldset>
        <label htmlFor="password">Password</label>
        <Link to="#">Forgot password?</Link>
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
        <input type="checkbox" id="remember" name="remember" />
        <label htmlFor="remember">Remember me</label>
        <Link to="/signup">Create an account</Link>
      </Form>
    </section>
  );
}
