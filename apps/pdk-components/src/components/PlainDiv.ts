import {defineComponent, h} from 'vue';

export default defineComponent({
  name: 'PlainDiv',
  render() {
    return h('div', this.$attrs, this.$slots);
  },
});
