import { build } from "esbuild";

build({
  entryPoints: ["src/main.ts"],
  bundle: true,
  outfile: "dist/main.js",
  format: "esm",
  platform: "browser",
  sourcemap: true,
}).catch(() => process.exit(1));
