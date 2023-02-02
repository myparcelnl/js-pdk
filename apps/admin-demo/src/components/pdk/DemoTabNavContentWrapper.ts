import {defineComponent, h} from 'vue';

export default defineComponent({
  name: 'DemoTabNavContentWrapper',
  render() {
    return h(
      'div',
      {
        class: 'mt-2 p-8',
      },
      this.$slots,
    );
  },
});
