module.exports = {
  root: true,
  ignorePatterns: ["dist", "node_modules"],
  extends: ["eslint:recommended", "plugin:astro/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  env: {
    browser: true,
    es2021: true
  }
};
