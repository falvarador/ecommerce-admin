import type { MetaFunction } from "@remix-run/cloudflare";

import A from "~/shared/components/link";
import { Button } from "~/shared/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "ecommerce admin" },
    {
      name: "description",
      content: "Welcome to ecommerce admin!",
    },
  ];
};

export default function Index() {
  return (
    <main className="container">
      <h1 className="text-3xl font-bold underline">
        Welcome to ecommerce admin!
      </h1>
      <Button asChild>
        <A href="account/login">Login</A>
      </Button>
      <Button variant="outline" asChild>
        <A href="account/register">Register</A>
      </Button>
    </main>
  );
}
