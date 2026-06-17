import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

// globals v11 has entries with trailing whitespace that ESLint v10 rejects
const cleanGlobals = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => k === k.trim()));

export default [
  // TypeScript-ESLint flat/recommended (3 config objects: base, recommended, eslint-override)
  ...tseslint.configs["flat/recommended"],
  // Project-wide settings
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: cleanGlobals({ ...globals.browser, ...globals.es2021 }),
    },
    plugins: {
      // eslint-plugin-react v7 is not compatible with ESLint v10 (uses removed
      // context.getFilename() API in its version-detection utility).
      // TypeScript covers prop-types; JSX transform eliminates react-in-jsx-scope.
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // react-hooks/rules-of-hooks: safe with ESLint v10
      // react-hooks/exhaustive-deps omitted: v4.6.0 uses removed context.getSourceCode()
      "react-hooks/rules-of-hooks": "error",
      // overrides matching old .eslintrc.json
      "prefer-const": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];
