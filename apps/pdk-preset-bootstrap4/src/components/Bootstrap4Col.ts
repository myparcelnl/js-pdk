/* eslint-disable @typescript-eslint/naming-convention */
import {FunctionalComponent, h} from 'vue';
import {PdkColProps} from '@myparcel/pdk-components';

/**
 * @see import('@myparcel/pdk-components').DefaultCol
 */
export const Bootstrap4Col: FunctionalComponent<PdkColProps> = (props, ctx) => {
  return h('div', {...ctx.attrs, class: [ctx.attrs.class, 'col']}, ctx.slots);
};

Bootstrap4Col.props = {
  span: {
    type: Number,
  },
  width: {
    type: String,
  },
};
