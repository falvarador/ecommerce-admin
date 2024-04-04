import { Dialog, Portal } from "@ark-ui/react";

interface Props {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}: Props) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => onChange(e.open)}>
      <Portal>
        <Dialog.Content>
          <Dialog.Backdrop>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
          </Dialog.Backdrop>
          <div>{children}</div>
        </Dialog.Content>
      </Portal>
    </Dialog.Root>
  );
};
