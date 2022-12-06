module.exports = {
  root: true,
  extends: ['@myparcel-eslint/eslint-config-esnext', '@myparcel-eslint/eslint-config-prettier'],
  rules: {
    'class-methods-use-this': 'off',
    'sort-exports/sort-exports': [
      'warn',
      { sortDir: 'asc', sortExportKindFirst: 'type' },
    ],
  },
  plugins: [
    'sort-exports',
  ],
  overrides: [
    {
      files: ['./**/*.vue'],
      extends: '@myparcel-eslint/eslint-config-prettier-typescript-vue',
      parserOptions: {
        project: 'tsconfig.build.json',
      },
      rules: {
        '@typescript-eslint/no-misused-promises': 'off',
        'vue/no-undef-components': [
          'error',
          {
            ignorePatterns: ['^Pdk(?:\\w)+$'],
          },
        ],
      },
    },
    {
      files: ['./**/*.ts', './**/*.tsx'],
      extends: '@myparcel-eslint/eslint-config-prettier-typescript',
      parserOptions: {
        project: 'tsconfig.build.json',
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
      },
    },
    {
      files: ['./**/*.js', './**/*.cjs', './**/*.mjs'],
      extends: '@myparcel-eslint/eslint-config-node',
    },
    {
      files: ['./**/*.spec.*', './**/*.test.*', './**/__tests__/**'],
      rules: {
        '@typescript-eslint/no-magic-numbers': 'off',
        'max-len': 'off',
        'max-lines-per-function': 'off',
      },
    },
  ],
};
