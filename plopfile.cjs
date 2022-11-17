/* eslint-disable no-template-curly-in-string,max-lines-per-function */

/**
 * @param {import('plop').NodePlopAPI} plop
 */
module.exports = (plop) => {
  plop.setGenerator('package', {
    description: 'Generate package',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name of new package',
      },
      {
        type: 'list',
        name: 'kind',
        message: 'Kind of package',
        choices: ['app', 'lib'],
        default: 'lib',
      },
      {
        type: 'list',
        when: ({ kind }) => kind === 'lib',
        name: 'category',
        message: 'Category of new package',
        choices: ['frontend', 'backend', 'build'],
      },
      {
        type: 'list',
        name: 'build',
        message: 'Build type',
        choices: ['tsup', 'vite'],
        default: 'tsup',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{ kind }}s/{{ category }}/{{ kebabCase name }}/src/index.ts',
        templateFile: 'plop-templates/package/index.ts.hbs',
      },
      {
        type: 'add',
        path: '{{ kind }}s/{{ category }}/{{ kebabCase name }}/package.json',
        templateFile: 'plop-templates/package/package.json.hbs',
      },
      {
        type: 'add',
        path: '{{ kind }}s/{{ category }}/{{ kebabCase name }}/tsconfig.build.json',
        template: `{
  "extends": "../tsconfig.build.json",
  "include": [
    "./src/**/*"
  ]
}
`,
      },
    ],
  });
};
