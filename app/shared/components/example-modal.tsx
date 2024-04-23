import { AlertDialog, Button, Flex } from "@radix-ui/themes";
// import { Link } from "@remix-run/react";

interface Props {
  title: string;
}

export const ExampleModal = ({ title }: Props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button>{title}</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This application will no longer be accessible and any
          existing sessions will be expired.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid">{title}</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
