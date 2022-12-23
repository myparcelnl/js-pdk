import {FunctionalComponent, h} from 'vue';

export interface PdkColProps {
  span?: number;
  width?: string;
}

/**
 * @see import('@myparcel/pdk-components').DefaultCol
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DemoCol: FunctionalComponent<PdkColProps> = (props, ctx) => {
  return h('div', {...ctx.attrs, class: [ctx.attrs.class]}, ctx.slots);
};

DemoCol.props = {
  span: {
    type: Number,
  },
  width: {
    type: String,
  },
};
