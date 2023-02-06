<template>
  <div v-if="hasAccount">
    <TabNavigation :tabs="tabs" />
  </div>
</template>

<script lang="ts">
import {EndpointName, PdkTab} from '@myparcel-pdk/common';
import {computed, defineComponent, ref, unref, watch} from 'vue';
import {useAccount, useLogger, useStoreContextQuery, useStoreQuery} from '../../composables';
import {ContextKey} from '../../types';
import TabNavigation from '../common/TabNavigation.vue';
import {createPluginSettingsTabs} from '../../forms';
import {get} from '@vueuse/core';

export default defineComponent({
  name: 'PluginSettingsForms',
  components: {
    TabNavigation,
  },

  setup: () => {
    const account = useAccount();
    const hasAccount = computed(() => Boolean(account));

    const dynamicContextQuery = useStoreContextQuery();
    const pluginSettingsContextQuery = useStoreContextQuery(ContextKey.PLUGIN_SETTINGS_VIEW);
    const updatePluginSettingsMutation = useStoreQuery(EndpointName.UPDATE_PLUGIN_SETTINGS);

    const tabs = ref<PdkTab[]>([]);

    watch(
      dynamicContextQuery.data,
      () => {
        if (!hasAccount.value || dynamicContextQuery.isLoading) {
          return;
        }

        const pluginSettingsView = get(pluginSettingsContextQuery.data);

        if (!pluginSettingsView) {
          const logger = useLogger();
          logger.error(`${ContextKey.PLUGIN_SETTINGS_VIEW} not found`);
          return;
        }

        tabs.value = createPluginSettingsTabs({
          view: unref(pluginSettingsView),
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
