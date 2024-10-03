import {defineField, type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {KEY_DESCRIPTION, KEY_SUBTEXT} from '../shipmentOptions';
import {createLabel} from './createLabel';

export const defineFormField = (config: InteractiveElementConfiguration): InteractiveElementConfiguration => {
  const {props, label} = config;

  // TODO: fix infinitely deep instantiation error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return defineField({
    ...config,
    props: {
      description: createLabel(label, KEY_DESCRIPTION),
      subtext: createLabel(label, KEY_SUBTEXT),
      ...props,
    },
  });
};
