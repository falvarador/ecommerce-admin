import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";

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
    <Card size="4" style={{ width: 400 }}>
      <Heading as="h3" size="6" trim="start" mb="5">
        Create an Account
      </Heading>
      <fetcher.Form method="post">
        <Box mb="5">
          <Text as="label" size="2" weight="medium" mb="1" htmlFor="first_name">
            First Name *
          </Text>
          <TextField.Root
            id="first_name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
            aria-label="Firt name"
            placeholder="Enter your first name"
          />
        </Box>
        <Box mb="5">
          <Text as="label" size="2" weight="medium" mb="1" htmlFor="last_name">
            Last Name *
          </Text>
          <TextField.Root
            id="last_name"
            name="last_name"
            type="text"
            autoComplete="additional-name"
            required
            aria-label="Last name"
            placeholder="Enter your last name"
          />
        </Box>
        <Box mb="5">
          <Text as="label" size="2" weight="medium" mb="1" htmlFor="phone">
            Phone Number
          </Text>
          <TextField.Root
            id="phone"
            name="phone"
            type="tel"
            autoComplete="mobile tel-local-prefix webauthn"
            aria-label="Phone"
            placeholder="Enter your phone number"
          />
        </Box>
        <Box mb="5">
          <Text as="label" size="2" weight="medium" mb="1" htmlFor="email">
            Email *
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
              Password *
            </Text>
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
          <Flex align="baseline" justify="between" mb="1">
            <Text as="label" size="2" weight="medium" htmlFor="password_repeat">
              Repeat Password *
            </Text>
          </Flex>
          <TextField.Root
            id="password_repeat"
            name="password_repeat"
            type="password"
            autoComplete="current-password"
            placeholder="Repeat Password"
            aria-label="Repeat Password"
            minLength={8}
            required
          />
        </Box>
        <Flex mt="6" justify="end" gap="3">
          <Button variant="soft" asChild>
            <RemixLink to="/signin">Have an account?</RemixLink>
          </Button>
          <Button type="submit">Sign up</Button>
        </Flex>
      </fetcher.Form>
    </Card>
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
