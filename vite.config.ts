import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "next/navigation": path.resolve(__dirname, "src/next-navigation.ts"),
      "next/link": path.resolve(__dirname, "src/next-link.tsx"),
      "next/font/google": path.resolve(__dirname, "src/next-font-google.ts"),
    },
  },
  build: { outDir: "dist", emptyOutDir: true },
});
