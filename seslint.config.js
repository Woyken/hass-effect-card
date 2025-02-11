// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended.rules,
  ...tseslint.configs.recommended,
  {
    extends: [eslintConfigPrettier],
  }
);
