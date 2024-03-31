import type { MetaFunction } from "@remix-run/cloudflare";

import A from "~/shared/components/link";

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
      <h1>Welcome to ecommerce admin!</h1>
      <A href="account/login">Login</A>
    </main>
  );
}
