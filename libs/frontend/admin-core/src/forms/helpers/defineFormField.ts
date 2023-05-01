import {InteractiveElementConfiguration, defineField} from '@myparcel/vue-form-builder/src';
import {useLanguage} from '../../composables';

export const defineFormField = (config: InteractiveElementConfiguration): InteractiveElementConfiguration => {
  const {label} = config;
  const {translate} = useLanguage();

  return defineField({
    ...config,
    props: {
      description: translate(`${label}_description`),
      subtext: translate(`${label}_subtext`),
      ...config.props,
    },
  });
};
