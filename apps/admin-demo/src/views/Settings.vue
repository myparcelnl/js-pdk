<template>
  <div id="pdk-PluginSettings" />
</template>

<script lang="ts">
import {defineComponent, nextTick} from 'vue';
import {AdminView} from '@myparcel-pdk/common/src';
import {useGlobalPdkAdmin} from '@myparcel-pdk/frontend-core/src';

export default defineComponent({
  name: 'Settings',

  setup: () => {
    const fe = useGlobalPdkAdmin();

    void nextTick().then(() => fe.render(AdminView.PLUGIN_SETTINGS, '#pdk-PluginSettings'));
  },
});
</script>
