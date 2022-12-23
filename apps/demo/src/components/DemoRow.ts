import {FunctionalComponent, h} from 'vue';

export interface PdkRowProps {
  collapseGutters?: boolean;
  columns?: number | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DemoRow: FunctionalComponent<PdkRowProps> = (props, ctx) => {
  const classes = [
    ctx.attrs.class,
    'grid',
    props.collapseGutters ? '' : 'gap-4',
    props.columns ? `grid-cols-${props.columns}` : 'grid-cols-auto',
  ];

  return h('div', {...ctx.attrs, class: classes}, ctx.slots);
};

DemoRow.props = {
  collapseGutters: {
    type: Boolean,
  },
  columns: {
    type: Number,
    default: null,
  },
};
