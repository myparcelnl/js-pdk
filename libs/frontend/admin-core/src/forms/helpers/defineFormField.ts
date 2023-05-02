import {InteractiveElementConfiguration, defineField} from '@myparcel/vue-form-builder/src';

export const defineFormField = (config: InteractiveElementConfiguration): InteractiveElementConfiguration => {
  const {props, label} = config;

  return defineField({
    ...config,
    props: {
      description: `${label}_description`,
      subtext: `${label}_subtext`,
      ...props,
    },
  });
};
