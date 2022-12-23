/* eslint-disable @typescript-eslint/naming-convention */
import {FunctionalComponent, h} from 'vue';

/**
 * @see import('@myparcel/pdk-components').DefaultButtonGroup
 */
export const Bootstrap4ButtonGroup: FunctionalComponent = (props, ctx) => {
  return h('div', {...ctx.attrs, class: [ctx.attrs.class, 'btn-group']}, ctx.slots);
};
