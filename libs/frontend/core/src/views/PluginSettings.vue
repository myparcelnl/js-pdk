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
import {
  fetchDynamicContextAction,
  fetchPluginSettingsViewContextAction,
  pluginSettingsUpdateAction,
  useUpdateAccountMutation,
  useUpdatePluginSettingsMutation,
} from '../actions';
import {useActionStore, useQueryStore} from '../stores';
import AccountSettings from '../components/PluginSettings/AccountSettings.vue';
import {AdminContextKey} from '../types';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import PluginSettingsForms from '../components/PluginSettings/PluginSettingsForms.vue';

const queryStore = useQueryStore();

queryStore.registerContextQueries(AdminContextKey.PLUGIN_SETTINGS_VIEW);

queryStore.register(BackendEndpoint.UPDATE_ACCOUNT, useUpdateAccountMutation());

queryStore.register(BackendEndpoint.UPDATE_PLUGIN_SETTINGS, useUpdatePluginSettingsMutation());

const actionStore = useActionStore();

actionStore.register([pluginSettingsUpdateAction, fetchPluginSettingsViewContextAction, fetchDynamicContextAction]);
</script>
