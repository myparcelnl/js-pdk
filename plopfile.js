/* eslint-disable no-template-curly-in-string,max-lines-per-function */

/**
 * @param {import('plop').NodePlopAPI} plop
 */
module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Generate component scaffolding',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
      },
    ],
    actions: (answers) => {
      const split = answers.name?.split('/');
      answers.name = split.pop();
      answers.path = `${split.join('/')}/`;

      return [
        {
          type: 'add',
          path: 'src/components/{{ path }}{{kebabCase name}}/{{ pascalCase name }}.vue',
          templateFile: 'plop-templates/Component.vue.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{ path }}{{ kebabCase name }}/{{ pascalCase name}}.spec.ts',
          templateFile: 'plop-templates/Component.spec.hbs',
        },
      ];
    },
  });
};
