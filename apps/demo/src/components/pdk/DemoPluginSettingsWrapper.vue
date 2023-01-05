<template>
  <slot />
</template>

<script lang="ts">
import {defineComponent} from 'vue';

/**
 * The component that wraps the plugin settings page.
 * @see import('@myparcel/pdk-components').DefaultPluginSettingsWrapper
 */
export default defineComponent({
  name: 'DemoPluginSettingsWrapper',
});
</script>
