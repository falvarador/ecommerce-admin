import { useEffect } from "react";
import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await requireUserSession(args);

  const service = dependenciesLocator.storeService();
  const { store, error } = await service.getStoreByUser(userId);

  if (error) {
    throw json({ error: error.kind }, { status: 500 });
  }

  if (store) {
    return redirect(`/${store.id}`);
  }

  return {};
};
export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard" },
    { name: "description", content: "ecommerce admin dashboard" },
  ];
};
export default function Index() {
  const { isOpen, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
