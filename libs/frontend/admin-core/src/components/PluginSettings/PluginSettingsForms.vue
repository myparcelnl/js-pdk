<template>
  <div>
    <div v-show="hasAccount">
      <TabNavigation :tabs="tabs" />
    </div>

    <PdkLoader v-if="loading" />
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import {get} from '@vueuse/core';
import {type TabDefinition} from '@myparcel-pdk/common';
import TabNavigation from '../common/TabNavigation.vue';
import {AdminContextKey, type AdminAction} from '../../types';
import {createActionContext} from '../../services';
import {createPluginSettingsTabs} from '../../forms';
import {useAdminConfig, useStoreContextQuery} from '../../composables';
import {pluginSettingsUpdateAction} from '../../actions';

const dynamicContextQuery = useStoreContextQuery();
const pluginSettingsContextQuery = useStoreContextQuery(AdminContextKey.PluginSettingsView);

const tabs = ref<TabDefinition[]>([]);
const hasAccount = computed(() => {
  return Boolean(get(dynamicContextQuery.data)?.account);
});

const config = useAdminConfig();

const actionContext = createActionContext<AdminAction.PluginSettingsUpdate>(pluginSettingsUpdateAction);

watch(
  () => dynamicContextQuery.dataUpdatedAt,
  () => {
    if (get(pluginSettingsContextQuery.isLoading) || get(dynamicContextQuery.isLoading)) {
      return;
    }

    const pluginSettingsView = get(pluginSettingsContextQuery.data);
    const dynamicContext = get(dynamicContextQuery.data);

    if (!pluginSettingsView || !dynamicContext?.pluginSettings || !hasAccount.value) {
      tabs.value = [];
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

const loading = computed(() => dynamicContextQuery.isLoading || pluginSettingsContextQuery.isLoading);
</script>
