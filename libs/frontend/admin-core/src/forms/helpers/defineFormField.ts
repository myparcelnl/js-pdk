import {InteractiveElementConfiguration, defineField} from '@myparcel/vue-form-builder/src';

export const defineFormField = (config: InteractiveElementConfiguration): InteractiveElementConfiguration => {
  const {label} = config;
  return defineField({
    ...config,
    props: {
      description: `${label}_description`,
      ...config.props,
    },
  });
};
