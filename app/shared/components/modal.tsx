import { NewStoreModal } from "~/shared/components/new-store-modal";
import { ExampleModal } from "~/shared/components/example-modal";

export type ModalAction = "new-store" | "example-modal";

export type ModalProps = {
  action?: ModalAction;
};

export function ModalContainer({ action }: ModalProps) {
  return (
    <>
      {action === "new-store" && <NewStoreModal title="New Store" isOpen />}
      {action === "example-modal" && (
        <ExampleModal title="Example modal" isOpen />
      )}
    </>
  );
}
