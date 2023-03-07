module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "airbnb",
    "airbnb-typescript",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: ["./tsconfig.json"]
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] }
    ],
    "react/require-default-props": 0,
    "react/button-has-type": 0,
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }]
  },
  settings: {
    alias: {
      map: [["@", "./src"]]
    }
  }
};
