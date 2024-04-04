import { toast } from "sonner";
import { useFetcher } from "@remix-run/react";

import { Button } from "~/shared/components/ui/button";
import { FormLabel } from "~/shared/components/ui/form-label";
import { Input } from "~/shared/components/ui/input";
import { Modal } from "~/shared/components/ui/modal";

export const action = async ({ request /*context*/ }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const { ...values } = Object.fromEntries(formData);

  if (
    !values.email ||
    !values.password ||
    typeof values.email !== "string" ||
    typeof values.password != "string"
  ) {
    return json(
      { ok: false, message: "email or password incorrect" },
      { status: 422, statusText: "Fields cannot be empty!" }
    );
  }

  // const user = await login(values as unknown as LoginCredentials, context);
  // if (!user)
  //   return json(
  //     { ok: false, message: "Wrong credentials!" },
  //     { status: 400, statusText: "Wrong credentials!" }
  //   );

  // // assign session
  // return createUserSession(user.id, "/account/dashboard", context);

  return null;
};

export default function NewStore() {
  const fetcher = useFetcher();

  return (
    <>
      <Modal
        title="Create store"
        description="Add a new store to manage products and categories."
        isOpen={isOpen}
        onClose={onClose}
      >
        <div>
          <div className="space-y-4 py-2 pb-4">
            <fetcher.Form>
              <FormLabel>Name</FormLabel>
              <Input
                disabled={fetcher.state === "submitting"}
                placeholder="E-Commerce"
                {...field}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button
                  disabled={fetcher.state === "submitting"}
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button disabled={fetcher.state === "submitting"} type="submit">
                  Continue
                </Button>
              </div>
            </fetcher.Form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export function StoreModal() {
  const { userId } = useAuth();

  const { isOpen, onClose } = useStoreModal();

  const onSubmit = async (values: unknown) => {
    try {
      const { name } = values;

      if (!userId) {
        throw new Error("User not found.");
      }

      fetcher.submit(
        { userId, name },
        { method: "POST", action: "/resources/stores" }
      );
      toast.success("Store created successfully.");
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
    }
  };
}
