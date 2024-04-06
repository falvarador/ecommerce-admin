import { useState } from "react";
import {
  // json,
  // redirect,
  // type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";

import { NewStoreModal } from "~/shared/components/new-store-modal";

export const loader = async (/*args: LoaderFunctionArgs*/) => {
  // const { userId } = await requireUserSession(args);

  // const service = dependenciesLocator.storeService();
  // const { store, error } = await service.getStoreByUser(userId);

  // if (error) {
  //   throw json({ error: error.kind }, { status: 500 });
  // }

  // if (store) {
  //   return redirect(`/${store.id}`);
  // }

  return {};
};
export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard" },
    { name: "description", content: "ecommerce admin dashboard" },
  ];
};
export default function Index() {
  const [isOpen, setIsOpen] = useState(true);

  // useEffect(() => {
  //   if (!isOpen) {
  //     onOpen();
  //   }
  // }, [isOpen, onOpen]);

  return (
    <div>
      <NewStoreModal
        title="Demo modal"
        description="Demo description"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      ></NewStoreModal>
      <button>Submit</button>
    </div>
  );
}
