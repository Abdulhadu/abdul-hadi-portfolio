import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // React Three Fiber uses non-standard JSX props (wireframe, transparent, args, attach, etc.)
  // These are valid R3F / Three.js props, not unknown DOM properties.
  {
    files: ["src/components/3d/**/*.tsx", "src/components/3d/**/*.ts"],
    rules: {
      "react/no-unknown-property": "off",
    },
  },
]);

export default eslintConfig;
