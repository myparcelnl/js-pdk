<template>
  <div id="pdk-PluginSettings"></div>
</template>

<script lang="ts">
import {defineComponent, nextTick} from 'vue';
import {useGlobalPdkFrontend} from '@myparcel-pdk/frontend-core';

export default defineComponent({
  name: 'Settings',

  setup: () => {
    const fe = useGlobalPdkFrontend();

    void nextTick().then(() => fe.render('PluginSettings', '#pdk-PluginSettings'));
  },
});
</script>
