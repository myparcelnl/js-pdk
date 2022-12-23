import {FunctionalComponent, h} from 'vue';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DefaultCol: FunctionalComponent<PdkColProps> = (props, ctx) => {
  return h('div', {...ctx.attrs, class: [ctx.attrs.class]}, ctx.slots);
};

DefaultCol.props = {
  span: {
    type: Number,
  },
  width: {
    type: String,
  },
};
