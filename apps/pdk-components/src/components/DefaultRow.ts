import {FunctionalComponent, h} from 'vue';
import {PdkRowProps} from '@myparcel-pdk/frontend-components';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DefaultRow: FunctionalComponent<PdkRowProps> = (props, ctx) => {
  const classes = [
    ctx.attrs.class,
    'grid',
    props.collapseGutters ? '' : 'gap-4',
    props.columns ? `grid-cols-${props.columns}` : 'grid-cols-auto',
  ];

  return h('div', {...ctx.attrs, class: classes}, ctx.slots);
};

DefaultRow.props = {
  collapseGutters: {
    type: Boolean,
  },
  columns: {
    type: Number,
    default: null,
  },
};
