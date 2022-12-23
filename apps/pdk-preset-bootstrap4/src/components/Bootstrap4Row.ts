/* eslint-disable @typescript-eslint/naming-convention */
import {FunctionalComponent, h} from 'vue';

/**
 * @see import('@myparcel/pdk-components').DefaultRow
 */
export const Bootstrap4Row: FunctionalComponent<PdkRowProps> = (props, ctx) => {
  const classes = [
    ctx.attrs.class,
    props.columns ? `row-cols-${props.columns}` : 'row',
    props.collapseGutters ? 'no-gutters' : '',
  ];

  return h('div', {...ctx.attrs, class: classes}, ctx.slots);
};

Bootstrap4Row.props = {
  collapseGutters: {
    type: Boolean,
  },
  columns: {
    type: Number,
    default: null,
  },
};
