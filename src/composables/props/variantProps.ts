import {PropType} from 'vue';

export const variantProps = (defaultValue?: Variant): Props => ({
  variant: {
    type: String as PropType<Variant>,
    default: defaultValue,
  },
});
