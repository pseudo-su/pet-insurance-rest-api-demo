module.exports = {
  env: {
    browser: false,
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    // Disable rules handled by prettier
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
};
