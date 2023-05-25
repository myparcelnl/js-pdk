<template>
  <PdkPluginSettingsWrapper v-test>
    <AccountSettings />

    <PluginSettingsForms />
  </PdkPluginSettingsWrapper>
</template>

<script lang="ts" setup>
/**
 * Plugin settings screen.
 */
import {BackendEndpoint} from '@myparcel-pdk/common';
import {AdminContextKey} from '../types';
import {useActionStore, useQueryStore} from '../stores';
import PluginSettingsForms from '../components/PluginSettings/PluginSettingsForms.vue';
import AccountSettings from '../components/PluginSettings/AccountSettings.vue';
import {
  fetchDynamicContextAction,
  fetchPluginSettingsViewContextAction,
  pluginSettingsUpdateAction,
  useUpdateAccountMutation,
  useUpdatePluginSettingsMutation,
} from '../actions';

const queryStore = useQueryStore();

queryStore.registerContextQueries(AdminContextKey.PluginSettingsView);

queryStore.register(BackendEndpoint.UpdateAccount, useUpdateAccountMutation());

queryStore.register(BackendEndpoint.UpdatePluginSettings, useUpdatePluginSettingsMutation());

const actionStore = useActionStore();

actionStore.register([pluginSettingsUpdateAction, fetchPluginSettingsViewContextAction, fetchDynamicContextAction]);
</script>
