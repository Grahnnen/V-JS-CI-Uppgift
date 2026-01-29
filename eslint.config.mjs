import js from "@eslint/js";
import jest from "eslint-plugin-jest";

export default [
  js.configs.recommended,
  {
    plugins: { jest },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
];
