<template>
  <div v-if="hasAccount">
    <TabNavigation :tabs="tabs" />
  </div>
</template>

<script lang="ts">
import {EndpointName, PdkTab} from '@myparcel-pdk/common';
import {computed, defineComponent, ref, watch} from 'vue';
import {useAccount, useLogger, useStoreQuery} from '../../composables';
import {ContextKey} from '../../types';
import TabNavigation from '../common/TabNavigation.vue';
import {createPluginSettingsTabs} from '../../forms';
import {get} from '@vueuse/core';
import {useFetchContextQuery} from '../../actions';

export default defineComponent({
  name: 'PluginSettingsForms',
  components: {
    TabNavigation,
  },

  setup: () => {
    const account = useAccount();
    const hasAccount = computed(() => Boolean(account));
    const dynamicContextQuery = useFetchContextQuery();
    const pluginSettingsContextQuery = useFetchContextQuery(ContextKey.PLUGIN_SETTINGS_VIEW);
    const updatePluginSettingsMutation = useStoreQuery(EndpointName.UPDATE_PLUGIN_SETTINGS);

    const tabs = ref<PdkTab[]>([]);

    watch(
      dynamicContextQuery.data,
      () => {
        if (!hasAccount.value || !dynamicContextQuery.isLoading) {
          return;
        }

        const pluginSettingsView = get(pluginSettingsContextQuery.data);

        if (!pluginSettingsView) {
          const logger = useLogger();
          logger.error(`${ContextKey.PLUGIN_SETTINGS_VIEW} not found`);
          return;
        }

        tabs.value = createPluginSettingsTabs({
          view: pluginSettingsView,
          mutation: updatePluginSettingsMutation,
          query: dynamicContextQuery,
        });
      },
      {immediate: true},
    );

    return {
      hasAccount,
      tabs,
    };
  },
});
</script>
