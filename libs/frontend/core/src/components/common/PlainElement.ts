import {defineComponent, h} from 'vue';

export default defineComponent({
  name: 'PlainElement',
  render() {
    return h('div', this.$attrs, this.$slots);
  },
});
