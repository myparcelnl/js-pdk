/* eslint-disable @typescript-eslint/naming-convention */
import {defineComponent, h} from 'vue';

/**
 * @see import('@myparcel/pdk-components').DefaultButtonGroup
 */
export default defineComponent({
  name: 'Bootstrap4ButtonGroup',
  render() {
    return h('div', {...this.$attrs, class: [this.$attrs.class, 'btn-group']}, this.$slots);
  },
});
