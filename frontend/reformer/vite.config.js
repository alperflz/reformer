import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  base: "/",

  build: {
    outDir: "dist",
    sourcemap: false,

    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["axios", "framer-motion"],
        },
      },
    },

    chunkSizeWarningLimit: 1500,
  },

  server: {
    port: 5173,
  },

  preview: {
    port: 4173,
  },
});
