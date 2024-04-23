import { type MetaFunction } from "@remix-run/cloudflare";
import { Container, Text } from "@radix-ui/themes";

import { ExampleModal } from "~/shared/components/example-modal";
import Link from "~/shared/components/link";

// export const loader = async (args: LoaderFunctionArgs) => {
//   // const { userId } = await requireUserSession(args);
//   const queryParams = new URL(args.request.url).searchParams;
//   const modalAction = queryParams.get("modal-type") as ModalAction | undefined;

//   // const service = dependenciesLocator.storeService();
//   // const { store, error } = await service.getStoreByUser(userId);

//   // if (error) {
//   //   throw json({ error: error.kind }, { status: 500 });
//   // }

//   // if (store) {
//   //   return redirect(`/${store.id}`);
//   // }

//   const modalProps = (() => {
//     if (modalAction === "new-store") {
//       return {
//         action: "new-store",
//       } as ModalProps;
//     }
//     if (modalAction === "example-modal") {
//       return {
//         action: "example-modal",
//       } as ModalProps;
//     }

//     return null;
//   })();

//   // const queryParams = new URL(request.url).searchParams;

//   return json(modalProps);
// };

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard" },
    { name: "description", content: "ecommerce admin dashboard" },
  ];
};

export default function Index() {
  // const data = useLoaderData<typeof loader>();

  return (
    <Container align="center">
      <Text>Hello from Radix Themes :)</Text>
      <ExampleModal title="Example modal"></ExampleModal>
      <Link href="?modal-type=example-modal">Example modal</Link>
      <Link href="?modal-type=new-store">New store modal</Link>
    </Container>
  );
}
