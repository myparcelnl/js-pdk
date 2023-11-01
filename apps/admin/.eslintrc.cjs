const path = require('path');

module.exports = {
  extends: ['../../.eslintrc.cjs'],
  parserOptions: {
    project: path.resolve(__dirname, '../../tsconfig.json'),
  },
  overrides: [
    {
      files: ['./src/*.ts'],
      plugins: ['sort-exports'],
      rules: {
        'sort-exports/sort-exports': ['warn', {sortDir: 'asc', sortExportKindFirst: 'type'}],
      },
    },
  ],
};
