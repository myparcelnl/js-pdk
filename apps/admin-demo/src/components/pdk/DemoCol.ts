import {defineComponent, h} from 'vue';

export default defineComponent({
  name: 'DemoCol',
  props: {
    span: {
      type: Number,
    },
    width: {
      type: String,
    },
  },
  render() {
    return h('div', {...this.$attrs, class: [this.$attrs.class]}, this.$slots);
  },
});
