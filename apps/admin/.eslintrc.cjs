module.exports = {
  extends: ['../../.eslintrc.cjs'],
  parserOptions: {
    project: ['../../tsconfig.json'],
  },
  overrides: [
    {
      files: ['./**/*.ts'],
      plugins: ['sort-exports'],
      rules: {
        'sort-exports/sort-exports': ['warn', {sortDir: 'asc', sortExportKindFirst: 'type'}],
      },
    },
  ],
};
