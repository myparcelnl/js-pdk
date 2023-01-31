<template>
  <TabNavigation
    v-if="accountQuery.data"
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
    const accountQuery = queryStore.get(EndpointName.FETCH_ACCOUNT);

    return {
      accountQuery,

      tabs: computed(() => {
        if (!accountQuery.data) {
          return [];
        }

        return createPluginSettingsTabs();
      }),
    };
  },
});
</script>
