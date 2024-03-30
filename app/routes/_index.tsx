import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";

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
      <Link to="account/login"></Link>
    </main>
  );
}
