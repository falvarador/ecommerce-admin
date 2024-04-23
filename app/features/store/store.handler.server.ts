export function storeHandler() {
  const getStore = (userId: string, storeId: string) => {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const store = await prismadb.store.findUnique({
            where: {
              id: storeId,
              userId,
            },
          });

          resolve(Either.right(store as Store));
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error } as DataError));
        }
      }, 100);
    });

    return { get };
  };
}
