import prettier from "eslint-config-prettier";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import { fileURLToPath } from "node:url";
import ts from "@typescript-eslint/eslint-plugin";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default [
  // Include recommended settings for JS, TypeScript, and Svelte
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs["flat/recommended"],

  // Prettier config for formatting
  prettier,

  // Prettier config for Svelte
  ...svelte.configs["flat/prettier"],

  {
    // Global options for the environment
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Handling for `.svelte` files
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        // Use TypeScript parser for Svelte files
        parser: "@typescript-eslint/parser",
      },
    },
  },
];
