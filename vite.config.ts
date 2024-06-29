import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@config",
        replacement: path.resolve(__dirname, "./src/config"),
      },
      {
        find: "@interfaces",
        replacement: path.resolve(__dirname, "./src/interfaces"),
      },
      {
        find: "@routes",
        replacement: path.resolve(__dirname, "./src/routes"),
      },
      {
        find: "@services",
        replacement: path.resolve(__dirname, "./src/services"),
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "./src/assets"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "./src/utils"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "./src/hooks"),
      },
      {
        find: "@context",
        replacement: path.resolve(__dirname, "./src/context"),
      },
    ],
  },
});
