import {FunctionalComponent, h} from 'vue';

/**
 * A wrapper that can be used to group buttons together.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DefaultButtonGroup: FunctionalComponent = (props, ctx) => {
  return h('div', ctx.attrs, ctx.slots);
};
