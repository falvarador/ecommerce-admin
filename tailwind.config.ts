import { parkwindPlugin } from "@park-ui/tailwind-plugin";
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {},
  },
  plugins: [parkwindPlugin],
} satisfies Config;
