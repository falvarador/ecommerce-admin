// @ts-check
import { defineConfig } from "astro/config";

import deno from "@deno/astro-adapter";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  adapter: deno(),
  integrations: [tailwind()],
  output: "server",
});
