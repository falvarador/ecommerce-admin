/// <reference path="../.astro/types.d.ts" />

type Models = import("node-appwrite").Models;

declare namespace App {
  interface Locals {
    user?: Models.User<Models.Preferences>;
  }
}

interface ImportMetaEnv {
  readonly APPWRITE_KEY: string;
  readonly PROJECT_HOST: string;
  readonly PUBLIC_APPWRITE_ENDPOINT: string;
  readonly PUBLIC_APPWRITE_PROJECT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
