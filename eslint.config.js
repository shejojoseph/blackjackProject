// eslint.config.cjs (change the file extension to .cjs)
module.exports = [
    {
      ignores: ["node_modules/**"],
    },
    {
      files: ["*.js"],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      rules: {
        "no-unused-vars": "warn",
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "indent": ["error", 2],
      },
    },
  ];
  