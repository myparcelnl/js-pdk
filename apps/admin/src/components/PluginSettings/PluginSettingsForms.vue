<template>
  <div v-test="$.type.__name">
    <PdkLoader v-show="loading" />

    <div v-show="!loading">
      <TabNavigation :tabs="tabs" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import {get} from '@vueuse/core';
import {AdminContextKey} from '@myparcel-pdk/common';
import {TabNavigation} from '../common';
import type {TabDefinition} from '../../types/common.types';
import {createActionContext} from '../../services/actions/createActionContext';
import {createPluginSettingsTabs} from '../../forms/pluginSettings/createPluginSettingsTabs';
import type {AdminAction} from '../../data/constants';
import {useAdminConfig} from '../../composables/useAdminConfig';
import {useStoreContextQuery} from '../../composables/useStoreContextQuery';
import {pluginSettingsUpdateAction} from '../../actions/definitions/settings';

const config = useAdminConfig();

const dynamicContextQuery = useStoreContextQuery();
const pluginSettingsContextQuery = useStoreContextQuery(AdminContextKey.PluginSettingsView);

const tabs = ref<TabDefinition[]>([]);

const actionContext = createActionContext<AdminAction.PluginSettingsUpdate>(pluginSettingsUpdateAction);

const loading = computed(() => dynamicContextQuery.isLoading || pluginSettingsContextQuery.isLoading);

watch(
  () => pluginSettingsContextQuery.dataUpdatedAt,
  () => {
    if (get(loading)) {
      return;
    }

    const pluginSettingsView = get(pluginSettingsContextQuery.data);
    const dynamicContext = get(dynamicContextQuery.data);

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
