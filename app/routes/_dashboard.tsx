import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

// import { dependenciesLocator } from "@/core/common/dependencies";
// import { Navbar } from "@/components";
import { sessionHandler } from "~/features/session/session.handler.server";

export const loader = async (args: LoaderFunctionArgs) => {
  const { context, request } = args;
  const { validateUserSession } = sessionHandler();

  const userId = await validateUserSession(context, request, "/login");

  if (!userId || typeof userId !== "string") {
    return redirect("/signin");
  }

  const { storeId } = args.params;
  const service = dependenciesLocator.storeService();
  const { store, error } = await service.getStore(userId, storeId as string);

  if (error) {
    throw json({ error: error.kind }, { status: 500 });
  }

  if (!store) {
    return redirect("/", 302);
  }

  return json(store);
};

export default function DashboardLayout() {
  return (
    <>
      {/* <Navbar /> */}
      <Outlet />
    </>
  );
}
