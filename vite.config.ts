import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => ({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    command === "build"
      ? nitro({
          preset: process.env.VERCEL ? "vercel" : "node-server",
        })
      : undefined,
    viteReact(),
    tsconfigPaths(),
    tailwindcss(),
  ],
}));
