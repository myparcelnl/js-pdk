<template>
  <div id="pdk-PluginSettings" />
</template>

<script lang="ts">
import {defineComponent, nextTick} from 'vue';
import {useGlobalPdkAdmin} from '@myparcel-pdk/admin';

export default defineComponent({
  name: 'Settings',

  setup: () => {
    const fe = useGlobalPdkAdmin();

    void nextTick().then(() => fe.render('PluginSettings', '#pdk-PluginSettings'));
  },
});
</script>
