<template>
  <PdkPluginSettingsWrapper v-test>
    <AccountSettings />

    <PluginSettingsForms v-if="hasAccount" />
  </PdkPluginSettingsWrapper>
</template>

<script lang="ts" setup>
/**
 * Plugin settings screen.
 */
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {AdminContextKey} from '../types';
import {useActionStore, useQueryStore} from '../stores';
import {useStoreContextQuery} from '../composables';
import PluginSettingsForms from '../components/PluginSettings/PluginSettingsForms.vue';
import AccountSettings from '../components/PluginSettings/AccountSettings.vue';
import {
  fetchDynamicContextAction,
  fetchPluginSettingsViewContextAction,
  pluginSettingsUpdateAction,
  useDeleteAccountMutation,
  useUpdateAccountMutation,
  useUpdatePluginSettingsMutation,
} from '../actions';

const queryStore = useQueryStore();

queryStore.registerContextQueries(AdminContextKey.PluginSettingsView);

queryStore.register(BackendEndpoint.DeleteAccount, useDeleteAccountMutation());
queryStore.register(BackendEndpoint.UpdateAccount, useUpdateAccountMutation());
queryStore.register(BackendEndpoint.UpdatePluginSettings, useUpdatePluginSettingsMutation());

const actionStore = useActionStore();

actionStore.register([pluginSettingsUpdateAction, fetchPluginSettingsViewContextAction, fetchDynamicContextAction]);

const dynamicContextQuery = useStoreContextQuery();

const hasAccount = computed(() => Boolean(get(dynamicContextQuery.data)?.account));
</script>
