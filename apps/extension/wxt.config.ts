import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  dev: { server: { port: 3001 } },
  srcDir: "src",
  // modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
        routesDirectory: "./src/entrypoints/popup/routes",
        generatedRouteTree: "./src/entrypoints/popup/routeTree.gen.ts"
      }),
      react(),
      tailwindcss()
    ]
  }),
  manifest: () => ({
    name: "Pouch",
    description: "A privacy-first, open-source bookmark manager.",
    permissions: [
      "cookies",
      "identity",
      "storage",
      "activeTab",
      "tabs",
      "scripting"
    ],
    host_permissions: ["<all_urls>"],
    // Required for webext-permission-toggle
    action: {}
    // webExt: {
    //   startUrls: ["https://wxt.dev", "https://google.com"]
    // }
  })
});
