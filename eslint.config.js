const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  // Apply Next.js recommended rules (includes core-web-vitals + TypeScript)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Ignore build artifacts
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },

  // React Three Fiber: disable react/no-unknown-property for 3D components
  // (wireframe, transparent, args, attach, sizeAttenuation, vertexColors are valid R3F props)
  {
    files: ["src/components/3d/**/*.tsx", "src/components/3d/**/*.ts"],
    rules: {
      "react/no-unknown-property": "off",
    },
  },
];

module.exports = config;
