import js from "@eslint/js";
import jest from "eslint-plugin-jest";

export default [
  {
    ...js.configs.recommended,
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        require: "readonly",
        module: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        AbortController: "readonly",
        fetch: "readonly",
      }
    },
    env: { node: true }
  },
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
