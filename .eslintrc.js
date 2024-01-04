module.exports = {
  extends: [
    // "@suimenkathemove/frontend-eslint-config",
    './node_modules/@suimenkathemove/frontend-eslint-config',
  ],
  overrides: [
    {
      files: ['cypress/**/*.ts', 'cypress/**/*.tsx'],
      parserOptions: {
        project: './cypress/tsconfig.json',
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 'error',
      },
    },
  ],
  ignorePatterns: ['wasm'],
};
