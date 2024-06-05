const path = require('path');
const packageJson = require('./package.json');

module.exports = {
  extends: ['../../.eslintrc.cjs'],
  parserOptions: {
    project: path.resolve(__dirname, '../../tsconfig.json'),
  },
  rules: {
    'no-restricted-imports': ['error', packageJson.name],
  },
  overrides: [
    {
      files: ['src/*.ts'],
      plugins: ['sort-exports'],
      rules: {
        'sort-exports/sort-exports': ['warn', {sortDir: 'asc', sortExportKindFirst: 'type'}],
      },
    },
  ],
};
