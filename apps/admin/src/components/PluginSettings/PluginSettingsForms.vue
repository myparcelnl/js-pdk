<template>
  <div v-test="$.type.__name">
    <PdkLoader v-show="loading" />

    <div v-show="!loading">
      <TabNavigation :tabs="tabs" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, toValue, watch} from 'vue';
import {AdminContextKey} from '@myparcel-dev/pdk-common';
import {TabNavigation} from '../common';
import {type TabDefinition} from '../../types';
import {createActionContext} from '../../services';
import {createPluginSettingsTabs} from '../../forms';
import {type AdminAction} from '../../data';
import {useAdminConfig, useStoreContextQuery} from '../../composables';
import {pluginSettingsUpdateAction} from '../../actions';

const config = useAdminConfig();

const dynamicContextQuery = useStoreContextQuery();
const pluginSettingsContextQuery = useStoreContextQuery(AdminContextKey.PluginSettingsView);

const tabs = ref<TabDefinition[]>([]);

const actionContext = createActionContext<AdminAction.PluginSettingsUpdate>(pluginSettingsUpdateAction);

const loading = computed(() => dynamicContextQuery.isLoading || pluginSettingsContextQuery.isLoading);

watch(
  () => pluginSettingsContextQuery.dataUpdatedAt,
  () => {
    if (toValue(loading)) {
      return;
    }

    const pluginSettingsView = toValue(pluginSettingsContextQuery.data);
    const dynamicContext = toValue(dynamicContextQuery.data);

    if (!pluginSettingsView || !dynamicContext?.pluginSettings) {
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
</script>
