import {defineComponent, h} from 'vue';

export default defineComponent({
  name: 'DemoTabNavButtonWrapper',
  render() {
    return h(
      'div',
      {
        class: '',
      },
      this.$slots,
    );
  },
});
