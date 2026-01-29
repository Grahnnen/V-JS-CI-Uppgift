import js from "@eslint/js";
import jest from "eslint-plugin-jest";

export default [
  js.configs.recommended,
  {
    plugins: { jest },
    rules: {
      ...jest.configs.recommended.rules,
    },
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        test: "readonly",
        expect: "readonly",
        jest: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        describe: "readonly",
        it: "readonly",
        global: "readonly"
      }
    }
  },
];
