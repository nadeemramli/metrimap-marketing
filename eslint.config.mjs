import next from "eslint-config-next";

/**
 * Next 16 ships a native ESLint flat-config array (core-web-vitals + typescript
 * rules included). We spread it directly — the legacy FlatCompat shim trips a
 * circular-structure bug in the eslintrc validator under ESLint 9/10.
 */
const eslintConfig = [
  ...next,
  {
    ignores: [".velite/**", ".next/**", "public/static/**"],
  },
];

export default eslintConfig;
