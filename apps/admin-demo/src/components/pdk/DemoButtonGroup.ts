import {defineComponent, h} from 'vue';

export default defineComponent({
  name: 'DemoButtonGroup',
  render() {
    return h('div', {...this.$attrs, class: []}, this.$slots);
  },
});
