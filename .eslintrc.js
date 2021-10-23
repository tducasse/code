module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "react-app",
    "plugin:react/recommended",
    "airbnb",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
  },
};
