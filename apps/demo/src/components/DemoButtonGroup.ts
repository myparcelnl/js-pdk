import {FunctionalComponent, h} from 'vue';

/**
 * @see import('@myparcel/pdk-components').DefaultButtonGroup
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DemoButtonGroup: FunctionalComponent = (props, ctx) => {
  return h('div', ctx.attrs, ctx.slots);
};
