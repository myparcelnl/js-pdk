<template>
  <div v-if="hasAccount">
    <TabNavigation :tabs="tabs" />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {EndpointName} from '@myparcel-pdk/common';
import TabNavigation from '../common/TabNavigation.vue';
import {createPluginSettingsTabs} from '../../forms';
import {get} from '@vueuse/core';
import {useStoreQuery} from '../../composables';

export default defineComponent({
  name: 'PluginSettingsForms',
  components: {
    TabNavigation,
  },

  setup: () => {
    const contextQuery = useStoreQuery(EndpointName.FETCH_CONTEXT);

    const hasAccount = computed(() => get(contextQuery.data)?.account);

    return {
      contextQuery,
      hasAccount,

      tabs: computed(() => {
        if (!hasAccount.value) {
          return [];
        }

        return createPluginSettingsTabs();
      }),
    };
  },
});
</script>
