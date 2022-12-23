<template>
  <slot />
</template>

<script lang="ts">
import {defineComponent} from 'vue';

/**
 * The component that wraps the plugin settings page.
 */
export default defineComponent({
  name: 'DefaultPluginSettingsWrapper',
});
</script>
