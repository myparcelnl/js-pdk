import {defineComponent, h} from 'vue';

/**
 * A wrapper that can be used to group buttons together.
 */
export default defineComponent({
  name: 'DefaultButtonGroup',
  render() {
    return h('div', this.$attrs, this.$slots);
  },
});
