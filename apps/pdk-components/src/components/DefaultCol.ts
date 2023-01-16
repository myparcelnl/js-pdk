import {defineComponent, h} from 'vue';

export default defineComponent({
  name: 'DefaultCol',
  props: {
    span: {
      type: Number,
    },
  },
  render() {
    return h('div', this.$attrs, this.$slots);
  },
});
