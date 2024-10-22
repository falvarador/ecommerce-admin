/// <reference path="../.astro/types.d.ts" />

interface User {
  object: "user";
  id: string;
  email: string;
  emailVerified: boolean;
  profilePictureUrl: string | null;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
  updatedAt: string;
}

declare namespace App {
  interface Locals {
    user?: User;
  }
}

interface ImportMetaEnv {
  readonly WORKOS_API_KEY: string;
  readonly WORKOS_CLIENT_ID: string;
  readonly WORKOS_COOKIE_PASSWORD: string;
  readonly WORKOS_REDIRECT_URI: string;
  readonly TURSO_AUTH_TOKEN: string;
  readonly TURSO_DATABASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
