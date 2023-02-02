import {defineComponent, h} from 'vue';

export default defineComponent({
  name: 'DefaultRow',
  props: {
    span: {
      type: Number,
    },
    width: {
      type: String,
    },
  },
  render() {
    return h('div', this.$attrs, this.$slots);
  },
});
