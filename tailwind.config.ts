import { parkwindPlugin } from "@park-ui/tailwind-plugin";
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {},
  },
  plugins: [parkwindPlugin],
  parkUI: {
    accentColor: "gold",
    grayColor: "sand",
    borderRadius: "sm",
  },
} satisfies Config;
