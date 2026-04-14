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
import {createPluginSettingsTabs, filterPluginSettingsView} from '../../forms';
import {type AdminAction} from '../../data';
import {useAdminConfig, useOrderMode, useStoreContextQuery} from '../../composables';
import {pluginSettingsUpdateAction} from '../../actions';

const config = useAdminConfig();
const orderMode = useOrderMode();

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

    const rawPluginSettingsView = toValue(pluginSettingsContextQuery.data);
    const dynamicContext = toValue(dynamicContextQuery.data);

    if (!rawPluginSettingsView || !dynamicContext?.pluginSettings) {
      tabs.value = [];
      return;
    }

    const pluginSettingsView = filterPluginSettingsView(rawPluginSettingsView, orderMode.value);

    tabs.value = createPluginSettingsTabs(pluginSettingsView, {
      pluginSettings: dynamicContext.pluginSettings,
      actionContext,
      config,
    });
  },
  {immediate: true},
);
</script>
