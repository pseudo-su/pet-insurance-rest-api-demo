'use strict';

module.exports = {
  env: {
    browser: false,
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ['prettier', 'node'],
  rules: {
    'prettier/prettier': 'warn',
    strict: 'warn',
  },
};
