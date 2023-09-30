import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import gzipPlugin from "rollup-plugin-gzip";

import dotenv from "dotenv";
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // ...
    rollupOptions: {
      // ...
      plugins: [
        // ...
        gzipPlugin({
          // Wähle die Dateitypen aus, die du komprimieren möchtest
          filter: /\.(js|css|html|json|svg)$/,
          // Gzip-Komprimierungseinstellungen (optional)
          minSize: 1024, // Mindestgröße der komprimierten Datei in Bytes
        }),
      ],
    },
  },
});
