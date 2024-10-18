// import { Account, Client, ID } from "node-appwrite";

// const { APPWRITE_KEY, PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } =
//   import.meta.env;

// // The name of your cookie that will store the session
// export const SESSION_COOKIE = "app-session";

// // Admin client, used to create new accounts
// export function createAdminClient() {
//   const client = new Client()
//     .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
//     .setProject(PUBLIC_APPWRITE_PROJECT)
//     .setKey(APPWRITE_KEY);

//   // Return the services you need
//   return {
//     get account() {
//       return new Account(client);
//     },

//     get id() {
//       return ID;
//     },
//   };
// }

// // Session client, used to make requests on behalf of the logged in user
// export function createSessionClient(request: Request) {
//   const client = new Client()
//     .setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
//     .setProject(PUBLIC_APPWRITE_PROJECT);

//   // Get the session cookie from the request and set the session
//   const cookies = parseCookies(request.headers.get("cookie") ?? "");
//   const session = cookies.get(SESSION_COOKIE);
//   if (!session) {
//     throw new Error("Session cookie not found");
//   }

//   client.setSession(session);

//   // Return the services you need
//   return {
//     get account() {
//       return new Account(client);
//     },
//   };
// }

// // Helper function to parse cookies
// function parseCookies(cookies: string) {
//   const map = new Map();
//   for (const cookie of cookies.split(";")) {
//     const [name, value] = cookie.split("=");
//     map.set(name.trim(), value ?? null);
//   }
//   return map;
// }
