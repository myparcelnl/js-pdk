<template>
  <TabNavigation
    v-if="contextQuery.data?.global?.account"
    :tabs="tabs" />
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {EndpointName} from '@myparcel-pdk/common';
import TabNavigation from '../common/TabNavigation.vue';
import {createPluginSettingsTabs} from '../../forms';
import {useQueryStore} from '../../stores';

export default defineComponent({
  name: 'PluginSettingsForms',
  components: {
    TabNavigation,
  },

  setup: () => {
    const queryStore = useQueryStore();
    const contextQuery = queryStore.get(EndpointName.FETCH_CONTEXT);

    return {
      contextQuery,

      tabs: computed(() => {
        if (!contextQuery.data) {
          return [];
        }

        return createPluginSettingsTabs();
      }),
    };
  },
});
</script>
