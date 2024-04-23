import {
  ActionFunctionArgs,
  json,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { useFetcher, Link as RemixLink } from "@remix-run/react";

import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Heading,
  Link,
  Text,
  TextField,
} from "@radix-ui/themes";

import { authHandler } from "~/features/auth/auth.handler.server";
import { LoginRequest } from "~/features/auth/auth.request.server";
import { sessionHandler } from "~/features/session/session.handler.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Log in | eCommerce Admin" },
    { name: "description", content: "Log into your eCommerce Admin account" },
  ];
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const { login } = authHandler();
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

  const user = await login(values as unknown as LoginRequest, context);
  if (!user)
    return json(
      { ok: false, message: "Wrong credentials!" },
      { status: 400, statusText: "Wrong credentials!" }
    );

  // Assign session
  return createUserSession(context, "/dashboard", user.id);
};

export default function Login() {
  const fetcher = useFetcher<React.ReactNode>();
  // const isLoading = fetcher.state === "loading";

  // {
  //   fetcher.state === "idle" && fetcher.data && (
  //     <div>
  //       <p className="">{fetcher.data.message}</p>
  //     </div>
  //   );
  // }

  return (
    <Card size="4" style={{ width: 400, height: 400 }}>
      <Heading as="h3" size="6" trim="start" mb="5">
        Sign in
      </Heading>
      <fetcher.Form method="post">
        <Box mb="5">
          <Text as="label" size="2" weight="medium" mb="1" htmlFor="email">
            Email
          </Text>
          <TextField.Root
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-label="Email address"
            placeholder="Enter your email address"
          />
        </Box>
        <Box mb="5" position="relative">
          <Flex align="baseline" justify="between" mb="1">
            <Text as="label" size="2" weight="medium" htmlFor="password">
              Password
            </Text>
            <Link asChild size="2">
              <RemixLink to="#">Forgot password?</RemixLink>
            </Link>
          </Flex>
          <TextField.Root
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            aria-label="Password"
            minLength={8}
            required
          />
        </Box>
        <Box mb="5" position="relative">
          <Flex align="center" justify="start" mb="1" gap="2">
            <Checkbox id="remember" name="remember" />
            <Text as="label" size="2" htmlFor="remember">
              Remember me
            </Text>
          </Flex>
        </Box>
        <Flex mt="6" justify="end" gap="3">
          <Button variant="soft" asChild>
            <RemixLink to="/register">Create an account</RemixLink>
          </Button>
          <Button type="submit">Sign in</Button>
        </Flex>
      </fetcher.Form>
    </Card>
  );
}
