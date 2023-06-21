

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // removed below styling and formatting
    // 'plugin:react/recommended',
    // 'google',
    ''
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {},
};