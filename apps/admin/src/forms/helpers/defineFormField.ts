import {defineField, type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';

export const defineFormField = (config: InteractiveElementConfiguration): InteractiveElementConfiguration => {
  const {props, label} = config;

  // TODO: fix infinitely deep instantiation error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return defineField({
    ...config,
    props: {
      description: `${label}_description`,
      subtext: `${label}_subtext`,
      ...props,
    },
  });
};
