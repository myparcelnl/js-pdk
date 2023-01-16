/* eslint-disable @typescript-eslint/naming-convention */
import {defineComponent, h} from 'vue';

/**
 * @see import('@myparcel/pdk-components').DefaultCol
 */
export default defineComponent({
  name: 'Bootstrap4Col',
  props: {
    span: {
      type: Number,
    },
  },
  render() {
    return h('div', {...this.$attrs, class: [this.$attrs.class, 'col']}, this.$slots);
  },
});
