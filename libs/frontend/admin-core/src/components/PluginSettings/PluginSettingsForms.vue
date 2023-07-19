<template>
  <div>
    <div v-show="hasAccount">
      <TabNavigation :tabs="tabs" />
    </div>

    <PdkLoader v-if="hasAccount && loading" />
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch} from 'vue';
import {get} from '@vueuse/core';
import {type TabDefinition} from '@myparcel-pdk/common';
import TabNavigation from '../common/TabNavigation.vue';
import {type AdminAction, AdminContextKey} from '../../types';
import {createActionContext} from '../../services';
import {createPluginSettingsTabs} from '../../forms';
import {useAdminConfig, useStoreContextQuery} from '../../composables';
import {pluginSettingsUpdateAction} from '../../actions';

const config = useAdminConfig();

const dynamicContextQuery = useStoreContextQuery();
const pluginSettingsContextQuery = useStoreContextQuery(AdminContextKey.PluginSettingsView);

const tabs = ref<TabDefinition[]>([]);

const hasAccount = computed(() => Boolean(get(dynamicContextQuery.data)?.account));

const actionContext = createActionContext<AdminAction.PluginSettingsUpdate>(pluginSettingsUpdateAction);

const loading = computed(() => dynamicContextQuery.isLoading || pluginSettingsContextQuery.isLoading);

watch(
  () => dynamicContextQuery.dataUpdatedAt,
  () => {
    if (get(loading)) {
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
</script>
