import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // The target URL where the requests will be proxied
        changeOrigin: true, // Changes the origin of the host header to the target URL
        secure: false, // If the target URL uses HTTPS, set this to true
        // rewrite: (path) => path.replace(/^\/api/, ''), // Rewrites the path if needed
        // agent: new http.Agent(), // Optional, can be used to configure the HTTP agent
      },
    },
  },
});
