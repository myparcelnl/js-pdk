import {defineComponent, h} from 'vue';

/**
 * @see import('@myparcel/pdk-components').DefaultPluginSettingsWrapper.ts
 */
export default defineComponent({
  name: 'DemoPluginSettingsWrapper',
  render() {
    return h(
      'div',
      {
        class: 'p-8 bg-white rounded-lg shadow-lg dark:bg-zinc-800',
      },
      this.$slots,
    );
  },
});
