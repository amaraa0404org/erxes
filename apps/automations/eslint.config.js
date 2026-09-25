const tseslint = require('typescript-eslint');

// Parser + plugin only: broad recommended rulesets are intentionally not
// enabled — the legacy backend surface has too many pre-existing violations.
// `no-explicit-any` is enforced only at the typed-code boundary
// (PLAN.md D4 enforcement).
module.exports = [
  tseslint.configs.base,
  {
    ignores: [
      '**/dist',
      '**/node_modules',
      '**/coverage',
      '**/*.generated.*',
      '**/__generated__/**',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/trpc/**', '**/graphql/**', '**/apollo/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];
