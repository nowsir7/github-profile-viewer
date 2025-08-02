import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    proxy: {
      "/users": {
        target: "https://api.github.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/users/, "/users"),
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
