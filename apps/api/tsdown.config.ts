import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "./src/index.ts",
  clean: true,
  shims: true,
  minify: true,
  noExternal: ["@pouch/auth", "@pouch/db"]
});
