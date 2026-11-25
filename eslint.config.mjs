import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import nextConfig from "eslint-config-next/core-web-vitals";

const nextAppFiles = [
  "apps/admin/**/*.{js,jsx,mjs,ts,tsx,mts,cts}",
  "apps/partner/**/*.{js,jsx,mjs,ts,tsx,mts,cts}",
];

const scopedNextConfig = nextConfig.map((config) =>
  config.ignores ? config : { ...config, files: nextAppFiles },
);

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/.expo/**",
      "**/coverage/**",
      "**/next-env.d.ts",
      "**/expo-env.d.ts",
    ],
  },
  ...scopedNextConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
    },
  },
];
