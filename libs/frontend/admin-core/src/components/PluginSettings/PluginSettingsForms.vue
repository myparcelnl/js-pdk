<template>
  <div v-show="hasAccount">
    <TabNavigation :tabs="tabs" />
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import {useAccount, useAdminConfig, useLogger, useStoreContextQuery} from '../../composables';
import {AdminContextKey} from '../../types';
import {TabDefinition} from '@myparcel-pdk/common';
import TabNavigation from '../common/TabNavigation.vue';
import {createActionContext} from '../../services';
import {createPluginSettingsTabs} from '../../forms';
import {get} from '@vueuse/core';
import {pluginSettingsUpdateAction} from '../../actions';

const dynamicContextQuery = useStoreContextQuery();
const pluginSettingsContextQuery = useStoreContextQuery(AdminContextKey.PluginSettingsView);

const tabs = ref<TabDefinition[]>([]);
const hasAccount = computed(() => !!get(dynamicContextQuery.data)?.account);
const logger = useLogger();

const config = useAdminConfig();
const actionContext = createActionContext(pluginSettingsUpdateAction);

watch(
  () => dynamicContextQuery.dataUpdatedAt,
  () => {
    if (pluginSettingsContextQuery.isLoading || dynamicContextQuery.isLoading || !useAccount()) {
      return;
    }

    const pluginSettingsView = get(pluginSettingsContextQuery.data);
    const dynamicContext = get(dynamicContextQuery.data);

    if (!dynamicContext?.pluginSettings) {
      logger.error('Plugin settings not found');
      return;
    }

    if (!pluginSettingsView) {
      logger.error(`${AdminContextKey.PluginSettingsView} not found`);
      return;
    }

    tabs.value = createPluginSettingsTabs(pluginSettingsView, {
      pluginSettings: dynamicContext.pluginSettings,
      actionContext,
      config,
    });
  },
  {immediate: true},
);
</script>
