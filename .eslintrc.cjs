module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["solid"],
  extends: ["standard-with-typescript", "plugin:solid/typescript", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      { allowNullableBoolean: true },
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
  },
};
